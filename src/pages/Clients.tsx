import React from 'react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useClientStore } from '../store/clientStore';
import type { Client } from '../types';
import { Plus, Search } from 'lucide-react';

const columnHelper = createColumnHelper<Client>();

const columns = [
  columnHelper.accessor('name', {
    header: 'Name',
    cell: (info) => (
      <div className="flex items-center">
        <div className="h-10 w-10 flex-shrink-0">
          <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
            {info.getValue().charAt(0)}
          </div>
        </div>
        <div className="ml-4">
          <div className="font-medium text-gray-900">{info.getValue()}</div>
          <div className="text-gray-500">{info.row.original.company}</div>
        </div>
      </div>
    ),
  }),
  columnHelper.accessor('email', {
    header: 'Email',
  }),
  columnHelper.accessor('phone', {
    header: 'Phone',
  }),
  columnHelper.accessor('industry', {
    header: 'Industry',
  }),
  columnHelper.accessor('status', {
    header: 'Status',
    cell: (info) => (
      <span
        className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
          info.getValue() === 'active'
            ? 'bg-green-100 text-green-800'
            : info.getValue() === 'inactive'
            ? 'bg-red-100 text-red-800'
            : 'bg-yellow-100 text-yellow-800'
        }`}
      >
        {info.getValue()}
      </span>
    ),
  }),
];

export function Clients() {
  const clients = useClientStore((state) => state.clients);
  const table = useReactTable({
    data: clients,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Clients</h1>
          <p className="mt-2 text-sm text-gray-700">
            A list of all clients including their name, company, contact details,
            and status.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button className="block rounded-md bg-blue-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
            <Plus className="h-5 w-5 inline-block -ml-1 mr-2" />
            Add client
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between gap-4">
        <div className="flex-1 max-w-sm">
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
              placeholder="Search clients..."
            />
          </div>
        </div>
      </div>

      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
                        <th
                          key={header.id}
                          scope="col"
                          className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                        >
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {table.getRowModel().rows.map((row) => (
                    <tr key={row.id}>
                      {row.getVisibleCells().map((cell) => (
                        <td
                          key={cell.id}
                          className="whitespace-nowrap py-4 pl-4 pr-3 text-sm text-gray-500 sm:pl-6"
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}