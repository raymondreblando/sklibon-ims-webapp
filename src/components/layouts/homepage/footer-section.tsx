export const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground w-full px-4 py-3 text-center text-sm font-medium">
      © {year} SK Federation Libon. All rights reserved.
    </footer>
  );
};
