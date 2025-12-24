import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Confetti = ({ x, y, onEnd }) => {
  const size = Math.random() * 10 + 5;
  const duration = Math.random() * 1000 + 500;
  const angle = Math.random() * Math.PI * 2;
  const velocity = Math.random() * 6 + 2;

  const endX = x + Math.cos(angle) * velocity * duration;
  const endY = y + Math.sin(angle) * velocity * duration + 100;

  return (
    <div
      style={{
        position: "fixed",
        left: x,
        top: y,
        width: size,
        height: size,
        pointerEvents: "none",
        animation: `celebrate ${duration}ms ease-out forwards`,
        "--end-x": `${endX - x}px`,
        "--end-y": `${endY - y}px`,
      }}
      onAnimationEnd={onEnd}
      className="bg-gradient-to-r from-yellow-400 to-red-400 rounded-full"
    />
  );
};

export const useTaskCompletion = () => {
  const [confetti, setConfetti] = useState([]);

  const celebrateTaskCompletion = (taskName, x, y) => {
    // Show toast notification
    toast.success(`🎉 Great job! "${taskName}" completed!`, {
      icon: "✨",
      duration: 3000,
    });

    // Create confetti particles
    const particles = Array.from({ length: 10 }, (_, i) => ({
      id: Date.now() + i,
      x: x || window.innerWidth / 2,
      y: y || window.innerHeight / 2,
    }));

    setConfetti((prev) => [...prev, ...particles]);
  };

  const removeConfetti = (id) => {
    setConfetti((prev) => prev.filter((c) => c.id !== id));
  };

  return { celebrateTaskCompletion, confetti, removeConfetti };
};

const CelebrationRenderer = ({ confetti, onRemove }) => {
  return (
    <>
      {confetti.map((particle) => (
        <Confetti
          key={particle.id}
          x={particle.x}
          y={particle.y}
          onEnd={() => onRemove(particle.id)}
        />
      ))}
    </>
  );
};

export default CelebrationRenderer;
