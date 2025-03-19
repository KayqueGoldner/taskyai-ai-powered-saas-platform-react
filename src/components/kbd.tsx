interface KbdProps {
  kbdList: string[];
}

export const Kbd: React.FC<KbdProps> = ({ kbdList }) => {
  return (
    <div className="space-x-1">
      <span className="sr-only">Keyboard Shortcut</span>

      {kbdList.map((item, index) => (
        <kbd
          key={index}
          className="inline-block rounded-full bg-background/10 px-1 py-0.5"
        >
          {item}
        </kbd>
      ))}
    </div>
  );
};
