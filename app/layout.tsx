import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Head from "next/head";
import Script from "next/script";
import "../public/assets/css/styles.css";
import "../public/assets/css/bootstrap.min.css";
import "../public/assets/css/font-awesome.min.css";
import "../public/assets/css/themify-icons.css";
import "../public/assets/css/metisMenu.css" ;
// import "../public/assets/css/owl.carousel.min.css";
import "../public/assets/css/slicknav.min.css" ;
import "../public/assets/css/sb-admin-2.css" ;
import "../public/assets/css/dataTables.bootstrap4.css" ;
// import "https://www.amcharts.com/lib/3/plugins/export/export.css";
import "../public/assets/css/typography.css" ;
import "../public/assets/css/default-css.css";
import "../public/assets/css/responsive.css" ;
// import "/amcharts/amcharts4/core.css";
// import "/amcharts/amcharts4/charts.css";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Oriental Dashboard Login",
  description: "Login to access the Oriental dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="no-js">
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="shortcut icon" href="/favicon.ico" />

        {/* Stylesheets */}
        <link rel="stylesheet" href="https://www.amcharts.com/lib/3/plugins/export/export.css" />
       
      </Head>

      <body className={inter.className}>
        {/* Preloader */}
        <div id="preloader">
          <div className="loader"></div>
        </div>

        {/* Page Content */}
        <div>{children}</div>

        {/* Scripts using next/script for optimization */}
        <Script src="assets/js/vendor/jquery-2.2.4.min.js" strategy="beforeInteractive" />
        <Script src="assets/js/popper.min.js" strategy="lazyOnload" />
        <Script src="assets/js/bootstrap.min.js" strategy="lazyOnload" />
        <Script src="assets/js/owl.carousel.min.js" strategy="lazyOnload" />
        <Script src="assets/js/metismenu.min.js" strategy="lazyOnload" />
        <Script src="assets/js/jquery.slimscroll.min.js" strategy="lazyOnload" />
        <Script src="assets/js/jquery.slicknav.min.js" strategy="lazyOnload" />
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.2/Chart.min.js" strategy="lazyOnload" />
        <Script src="https://code.highcharts.com/highcharts.js" strategy="lazyOnload" />
        <Script src="https://code.highcharts.com/modules/exporting.js" strategy="lazyOnload" />
        <Script src="https://code.highcharts.com/modules/export-data.js" strategy="lazyOnload" />
        <Script src="https://www.amcharts.com/lib/3/amcharts.js" strategy="lazyOnload" />
        <Script src="https://www.amcharts.com/lib/3/ammap.js" strategy="lazyOnload" />
        <Script src="https://www.amcharts.com/lib/3/maps/js/worldLow.js" strategy="lazyOnload" />
        <Script src="https://www.amcharts.com/lib/3/serial.js" strategy="lazyOnload" />
        <Script src="https://www.amcharts.com/lib/3/plugins/export/export.min.js" strategy="lazyOnload" />
        <Script src="https://www.amcharts.com/lib/3/themes/light.js" strategy="lazyOnload" />
        <Script src="assets/js/jquery.datatables.js" strategy="lazyOnload" />
        <Script src="assets/js/datatables.bootstrap4.js" strategy="lazyOnload" />
        <Script src="assets/js/plugins.js" strategy="lazyOnload" />
        <Script src="assets/js/scripts.js" strategy="lazyOnload" />
      </body>
    </html>
  );
}
