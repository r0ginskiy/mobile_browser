import { useState, useEffect, useCallback, useRef } from 'react';

interface UseKeyboardNavigationOptions {
  totalItems: number;
  columnsPerRow: number;
  onSelect: (index: number) => void;
  onEscape: () => void;
  enabled?: boolean;
}

export function useKeyboardNavigation({
  totalItems,
  columnsPerRow,
  onSelect,
  onEscape,
  enabled = true,
}: UseKeyboardNavigationOptions) {
  const [focusedIndex, setFocusedIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setFocusedIndex(0);
  }, [totalItems]);

  useEffect(() => {
    if (!containerRef.current) return;
    const focusedCard = containerRef.current.children[focusedIndex] as HTMLElement;
    if (focusedCard) {
      focusedCard.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
  }, [focusedIndex]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!enabled || totalItems === 0) return;

      switch (e.key) {
        case 'ArrowRight':
          e.preventDefault();
          setFocusedIndex((prev) => Math.min(prev + 1, totalItems - 1));
          break;
        case 'ArrowLeft':
          e.preventDefault();
          setFocusedIndex((prev) => Math.max(prev - 1, 0));
          break;
        case 'ArrowDown':
          e.preventDefault();
          setFocusedIndex((prev) =>
            Math.min(prev + columnsPerRow, totalItems - 1),
          );
          break;
        case 'ArrowUp':
          e.preventDefault();
          setFocusedIndex((prev) => Math.max(prev - columnsPerRow, 0));
          break;
        case 'Enter':
          e.preventDefault();
          onSelect(focusedIndex);
          break;
        case 'Escape':
          e.preventDefault();
          onEscape();
          break;
      }
    },
    [enabled, totalItems, columnsPerRow, onSelect, onEscape, focusedIndex],
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return { focusedIndex, containerRef };
}
