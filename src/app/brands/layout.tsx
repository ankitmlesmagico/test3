export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="bg-[#F9F9FC] px-5 py-2.5">{children}</div>;
}
