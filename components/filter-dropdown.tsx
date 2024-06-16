'use client';

  import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { Button } from '@/components/ui/button';
import { Filter } from 'lucide-react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function FilterDropdown() {
  const [filterStatus, setFilterStatus] = useState('');

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter()

  function handleChangeFilter(value: string) {
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set('status', value);
    } else {
      params.delete('status');
    }

    replace(`${pathname}?${params.toString()}`);
    setFilterStatus(value);
  }

  const getStatusTitle = () => {
    switch (filterStatus) {
      case 'pending':
        return 'Pendente';
      case 'completed':
        return 'Completo';
      case '':
        return 'Todos';
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size={'default'}
          className="flex gap-2 text-slate-600"
        >
          <Filter className="h-4 w-4" />
          {filterStatus !== undefined ? getStatusTitle() : 'Status'}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-16">
        <DropdownMenuLabel>Filtrar por:</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={filterStatus} onValueChange={handleChangeFilter}>
          <DropdownMenuRadioItem value="">Todos</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="pending">
            Pendente
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="completed">
            Completo
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
