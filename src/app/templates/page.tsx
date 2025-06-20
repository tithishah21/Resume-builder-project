"use client";

import dynamic from 'next/dynamic';

const ClientTemplatesPage = dynamic(() => import('./ClientTemplatesPage'), { ssr: false });

export default function Page() {
  return <ClientTemplatesPage />;
}