"use client";
import { useEffect } from 'react';
import Router from 'next/router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

// Customize NProgress
NProgress.configure({
   showSpinner: false,
   speed: 500,
   minimum: 0.3        // Set the minimum percentage before the progress starts
});

const GlobalLoader = () => {
   useEffect(() => {
      const handleRouteStart = () => NProgress.start();
      const handleRouteDone = () => NProgress.done();

      Router.events.on('routeChangeStart', handleRouteStart);
      Router.events.on('routeChangeComplete', handleRouteDone);
      Router.events.on('routeChangeError', handleRouteDone);

      // Cleanup the event listeners on unmount
      return () => {
         Router.events.off('routeChangeStart', handleRouteStart);
         Router.events.off('routeChangeComplete', handleRouteDone);
         Router.events.off('routeChangeError', handleRouteDone);
      };
   }, []);

   return null; // This component doesn't render anything visible
};

export default GlobalLoader;
