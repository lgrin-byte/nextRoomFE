import { Inter } from "next/font/google";
import StyledJsxRegistry from "@/lib/registry";
import Recoil from "@/lib/recoil";
import ReactQueryProvider from "@/lib/reactQueryProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Escape Room",
  description: "Escape Room Dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <Recoil>
          <ReactQueryProvider>
            <StyledJsxRegistry>{children}</StyledJsxRegistry>
          </ReactQueryProvider>
        </Recoil>
      </body>
    </html>
  );
}
