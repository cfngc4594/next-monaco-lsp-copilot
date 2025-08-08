import confetti from "canvas-confetti";

export const useConfettiEffects = () => {
  // Effect 1: Classic Party Popper 🎉
  // A sharp, directional burst. Good for the "Submit" button.
  const handlePopperEffect = () => {
    // Left popper
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { x: 0, y: 0.6 },
      angle: 60,
    });
    // Right popper
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { x: 1, y: 0.6 },
      angle: 120,
    });
  };

  // Effect 2: Fireworks Explosion 🎆
  // A big, centered explosion. Good for the "Play" button.
  const handleFireworksEffect = () => {
    const duration = 5 * 1000; // 5 seconds
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function () {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      // since particles fall down, start a bit higher than random
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
    }, 250);
  };

  // Effect 3: Falling Stars ✨
  // A gentle, continuous shower from the top. Good for the "Debug" button.
  const handleStarsEffect = () => {
    const end = Date.now() + 3 * 1000; // 3 seconds

    // go Buckeyes!
    const colors = ["#bb0000", "#ffffff"];

    (function frame() {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  };

  return {
    handlePopperEffect,
    handleFireworksEffect,
    handleStarsEffect,
  };
};
