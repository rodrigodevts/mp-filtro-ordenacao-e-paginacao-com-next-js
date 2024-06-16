'use client';

import {
  Pagination as PaginationComponent,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination';
import { Links } from '@/lib/types';
import { cn } from '@/lib/utils';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

type PaginationProps = {
  links: Links[];
  lastPage: number;
}

export default function Pagination({ links, lastPage }: PaginationProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleClickPage(pageNumber: number) {
    const params = new URLSearchParams(searchParams);

    if (pageNumber > 1) {
      if (pageNumber > lastPage) {
        return;
      }
      params.set('page', pageNumber.toString());
    } else {
      params.delete('page');
    }

    replace(`${pathname}?${params.toString()}`, {
      scroll: false,  
    });
  }

  return (
    <PaginationComponent>
      <PaginationContent>
        <PaginationItem
          className={cn(links[0].url ? 'cursor-pointer' : 'cursor-default opacity-50')}
          onClick={() => handleClickPage(Number(searchParams.get('page') || 1) - 1)}
        >
          <PaginationPrevious />
        </PaginationItem>

        {
          links.map((link) => {

            if (link.label.includes('Anterior') || link.label.includes('Próximo')) {
              return null;
            }

            if (link.label === '...') {
              return (
                <PaginationItem key={link.id} className='hidden md:inline-flex'>
                  <PaginationEllipsis />
                </PaginationItem>
              )
            }

            return (
              <PaginationItem
                className="hidden md:inline-flex cursor-pointer"
                key={link.label}
              >
                <PaginationLink
                  onClick={() => handleClickPage(Number(link.label))}
                  isActive={link.active}
                  dangerouslySetInnerHTML={{ __html: link.label }}
                />
              </PaginationItem>
            )
          })
        }
        <PaginationItem
          className={cn(links[links.length - 1].url ? 'cursor-pointer' : 'cursor-default opacity-50')}
          onClick={() => handleClickPage(Number(searchParams.get('page') || 1) + 1)}
        >
          <PaginationNext />
        </PaginationItem> 
      </PaginationContent>
    </PaginationComponent>
  );
}
