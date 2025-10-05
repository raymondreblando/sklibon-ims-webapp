import SkLogo from "@/assets/logo.webp";

export const Loader = () => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="relative">
        <img src={SkLogo} alt="sk logo" className="w-14" />
        <div className="spinner absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
      </div>
    </div>
  );
};
