"use client";

import { useEffect } from "react";

export default function NotFound() {
  useEffect(() => {
    // GitHub Pages redirect script
    // When accessing /path (no trailing slash), GitHub Pages serves 404
    // This redirects to /path/ which resolves to /path/index.html
    const path = window.location.pathname;
    
    // Don't redirect if already has trailing slash or is a file
    if (!path.endsWith('/') && !path.match(/\.[a-zA-Z0-9]+$/)) {
      window.location.replace(path + '/' + window.location.search + window.location.hash);
      return;
    }
  }, []);

  return (
    <div style={{
      fontFamily: 'system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      height: '100vh',
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div>
        <h1 style={{
          display: 'inline-block',
          margin: '0 20px 0 0',
          padding: '0 23px 0 0',
          fontSize: 24,
          fontWeight: 500,
          verticalAlign: 'top',
          lineHeight: '49px',
          borderRight: '1px solid rgba(0,0,0,.3)'
        }}>404</h1>
        <div style={{ display: 'inline-block' }}>
          <h2 style={{
            fontSize: 14,
            fontWeight: 400,
            lineHeight: '49px',
            margin: 0
          }}>This page could not be found.</h2>
        </div>
      </div>
    </div>
  );
}
