'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import css from './not-found.module.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Page Not Found ",
  description: "This page does not exist or you do not have access",
  openGraph: {
    title: "Page Not Found",
    description:
      "This page does not exist or you do not have access",
    url: "https://notehub.com/notes/${id}",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "NoteHub preview",
      },
    ],
  },
};


const NotFound = () => {
  const router = useRouter();

  
  useEffect(() => {
    
    const timer = setTimeout(() => router.push('/'), 3000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div>
      <h1 className={css.title}>404 - Page not found</h1>
<p className={css.description}>Sorry, the page you are looking for does not exist.</p>
    </div>
  );
};
export default NotFound