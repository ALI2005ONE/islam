'use client';

import { useEffect } from 'react';

export function LearningPathScript() {
  useEffect(() => {
    const btn = document.getElementById('lpToggle');
    const menu = document.getElementById('lpMenu');

    if (!btn || !menu) return;

    function closeMenu() {
      menu.style.display = 'none';
      btn.setAttribute('aria-expanded', 'false');
    }

    function handleButtonClick(e: Event) {
      e.stopPropagation();
      const isOpen = menu.style.display === 'block';
      menu.style.display = isOpen ? 'none' : 'block';
      btn.setAttribute('aria-expanded', String(!isOpen));
    }

    function handleDocumentClick() {
      if (menu.style.display === 'block') closeMenu();
    }

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape' && menu.style.display === 'block') {
        closeMenu();
        btn.focus();
      }
    }

    btn.addEventListener('click', handleButtonClick);
    document.addEventListener('click', handleDocumentClick);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      btn.removeEventListener('click', handleButtonClick);
      document.removeEventListener('click', handleDocumentClick);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return null;
}