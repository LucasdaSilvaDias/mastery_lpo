type CardProps = {
    children: React.ReactNode;
  };
  
  export function Card({ children }: CardProps) {
    return (
      <div className="w-full max-w-md rounded-3xl border border-[#262626] bg-[#171717] p-8 shadow-2xl">
        {children}
      </div>
    );
  }