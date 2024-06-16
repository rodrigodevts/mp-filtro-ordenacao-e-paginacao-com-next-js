import FilterDropdown from '@/components/filter-dropdown';
import OrdersTable from '@/components/orders-table';
import Pagination from '@/components/pagination';
import SearchInput from '@/components/search-input';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Links } from '@/lib/types';
import { api } from '@/services/api';

type ComponentsProps = {
  searchParams?: {
    search?: string;
    status?: string;
    sort?: string;
    page?: string;
  }
}

export default async function Component({ searchParams }: ComponentsProps) {
  // fetch dos dados
  const response = await api.get('/orders', {
    params: {
      search: searchParams?.search,
      status: searchParams?.status,
      sort: searchParams?.sort,
      page: searchParams?.page,
    }
  });

  const orders = response.data.data;
  let links: Links[] = response.data.meta.links;
  const lastPage = response.data.meta.last_page;

  links = links.map((link, index) => (
    { ...link, id: index }
  ));

  return (
    <main className="container px-1 py-10 md:p-10">
      <Card>
        <CardHeader className="px-7">
          <CardTitle>Pedidos</CardTitle>
          <CardDescription>
            Uma listagem de pedidos do seu negócio.
          </CardDescription>
          <div className="flex pt-10 gap-4">
            <SearchInput />
            <FilterDropdown />
          </div>
        </CardHeader>
        <CardContent>
          <OrdersTable orders={orders} />
          <div className="mt-8">
            <Pagination links={links} lastPage={lastPage} />
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
