export interface BoxProps extends React.ComponentProps<'div'> {
  noShadow?: boolean;
  transparent?: boolean;
}

export default function Box({ children, transparent, noShadow, className, ...props }: BoxProps) {
  return (
    <div
      className={`${!transparent && 'bg-background'} p-4 ${!noShadow && 'shadow-md'} border dark:shadow-none ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
