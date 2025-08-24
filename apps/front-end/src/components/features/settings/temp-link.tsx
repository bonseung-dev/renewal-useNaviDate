'use client';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface TempLinkProps {
  text: string;
  href?: string;
}

const TempLink = ({ text, href }: TempLinkProps) => (
  <Link
    href={href || '#'}
    onClick={(e) => {
      e.preventDefault();
      alert('이 링크는 UI 시연용입니다. 기능은 아직 구현되지 않았습니다.');
    }}
    className="flex items-center justify-between text-m-h3 text-font2 hover:text-skin1 hover:font-bold"
  >
    <span>{text}</span>
    <ChevronRight size={14} />
  </Link>
);

export default TempLink;
