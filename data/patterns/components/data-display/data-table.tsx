/**
 * DataTable Component
 *
 * Standardized table with sorting, filtering, and pagination.
 *
 * @example
 * ```tsx
 * <DataTable
 *   columns={[
 *     { key: 'name', header: 'Name', sortable: true },
 *     { key: 'email', header: 'Email' },
 *     { key: 'status', header: 'Status', filterable: true }
 *   ]}
 *   data={users}
 *   onSort={(key, direction) => handleSort(key, direction)}
 * />
 * ```
 */

'use client';

import React, { useState } from 'react';
import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { SkeletonTable } from '../feedback/SkeletonTable';
import type { DataTableProps, SortDirection, TableColumn } from '../types';

export function DataTable<T extends Record<string, any>>({
  columns,
  data,
  loading = false,
  emptyState,
  onSort,
  onFilter,
  pagination,
  rowActions,
  className,
}: DataTableProps<T>) {
  const [sortState, setSortState] = useState<{
    key: string | null;
    direction: SortDirection | null;
  }>({ key: null, direction: null });

  const handleSort = (key: string) => {
    if (!onSort) return;

    let newDirection: SortDirection = 'asc';

    if (sortState.key === key) {
      newDirection = sortState.direction === 'asc' ? 'desc' : 'asc';
    }

    setSortState({ key, direction: newDirection });
    onSort(key, newDirection);
  };

  if (loading) {
    return (
      <SkeletonTable
        rows={5}
        columns={columns.length + (rowActions ? 1 : 0)}
        className={className}
      />
    );
  }

  if (data.length === 0 && emptyState) {
    return (
      <div className={cn('flex items-center justify-center py-12', className)}>
        {emptyState}
      </div>
    );
  }

  return (
    <div className={cn('w-full', className)}>
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column: TableColumn<T>) => (
                <TableHead
                  key={column.key}
                  style={{ width: column.width }}
                  className={cn(
                    column.sortable && 'cursor-pointer select-none',
                    'font-semibold'
                  )}
                  onClick={() => column.sortable && handleSort(column.key)}
                >
                  <div className="flex items-center gap-2">
                    <span>{column.header}</span>
                    {column.sortable && (
                      <span className="text-muted-foreground">
                        {sortState.key === column.key ? (
                          sortState.direction === 'asc' ? (
                            <ArrowUp className="h-4 w-4" />
                          ) : (
                            <ArrowDown className="h-4 w-4" />
                          )
                        ) : (
                          <ArrowUpDown className="h-4 w-4" />
                        )}
                      </span>
                    )}
                  </div>
                </TableHead>
              ))}
              {rowActions && (
                <TableHead className="w-[100px] text-right">Ações</TableHead>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row: T, rowIndex: number) => (
              <TableRow key={rowIndex}>
                {columns.map((column: TableColumn<T>) => (
                  <TableCell key={column.key}>
                    {column.render ? column.render(row) : row[column.key]}
                  </TableCell>
                ))}
                {rowActions && (
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      {rowActions(row)}
                    </div>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {pagination && (
        <div className="mt-4">
          {/* Pagination will be added in Task 7 */}
          <div className="text-sm text-muted-foreground">
            Showing {data.length} of {pagination.totalItems} items
          </div>
        </div>
      )}
    </div>
  );
}

DataTable.displayName = 'DataTable';
