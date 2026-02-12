import { useState, useEffect, useCallback, useRef } from 'react';

interface UseKeyboardNavigationOptions {
  totalItems: number;
  columnsPerRow: number;
  onSelect: (index: number) => void;
  onEscape?: () => void;
  onLeaveUp?: () => void;
  onLeaveDown?: () => void;
  enabled?: boolean;
}

export function useKeyboardNavigation({
  totalItems,
  columnsPerRow,
  onSelect,
  onEscape,
  onLeaveUp,
  onLeaveDown,
  enabled = true,
}: UseKeyboardNavigationOptions) {
  const [focusedIndex, setFocusedIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setFocusedIndex(0);
  }, [totalItems]);

  useEffect(() => {
    if (!enabled || !containerRef.current) return;
    const focusedCard = containerRef.current.children[focusedIndex] as HTMLElement;
    if (focusedCard) {
      focusedCard.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
  }, [focusedIndex, enabled]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!enabled || totalItems === 0) return;

      switch (e.key) {
        case 'ArrowRight':
          e.preventDefault();
          if (focusedIndex === totalItems - 1) {
            onLeaveDown?.();
          } else {
            setFocusedIndex((prev) => Math.min(prev + 1, totalItems - 1));
          }
          break;
        case 'ArrowLeft':
          e.preventDefault();
          if (focusedIndex === 0) {
            onLeaveUp?.();
          } else {
            setFocusedIndex((prev) => Math.max(prev - 1, 0));
          }
          break;
        case 'ArrowDown':
          e.preventDefault();
          if (focusedIndex + columnsPerRow >= totalItems) {
            onLeaveDown?.();
          } else {
            setFocusedIndex((prev) =>
              Math.min(prev + columnsPerRow, totalItems - 1),
            );
          }
          break;
        case 'ArrowUp':
          e.preventDefault();
          if (focusedIndex - columnsPerRow < 0) {
            onLeaveUp?.();
          } else {
            setFocusedIndex((prev) => Math.max(prev - columnsPerRow, 0));
          }
          break;
        case 'Enter':
          e.preventDefault();
          onSelect(focusedIndex);
          break;
        case 'Escape':
          if (onEscape) {
            e.preventDefault();
            onEscape();
          }
          break;
      }
    },
    [enabled, totalItems, columnsPerRow, onSelect, onEscape, onLeaveUp, onLeaveDown, focusedIndex],
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return { focusedIndex, setFocusedIndex, containerRef };
}
