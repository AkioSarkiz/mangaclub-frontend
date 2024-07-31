import { nightTokyo } from '@/utils/fonts';

export const Logo = () => {
  return (
    <span
      className={`${nightTokyo.className} btn btn-ghost font-extrabold text-4xl bg-clip-text bg-gradient-to-r text-primary tracking-widest`}
    >
      ML
    </span>
  );
};
