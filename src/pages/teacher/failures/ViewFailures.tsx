import { DeleteButton } from '@/components/buttons/DeleteButton.tsx'
import { EditButton } from '@/components/buttons/EditButton.tsx'
import { NewRecordButton } from '@/components/buttons/NewRecordButton.tsx'
import { CheckMarkIcon } from '@/components/icons/CheckMarkIcon.tsx'
import { AcademicYearPicker } from '@/components/inputs/AcademicYearPicker.tsx'
import { useAuth } from '@/hooks/useAuth.tsx'
import { useFetchPageInViewport } from '@/hooks/useFetchPageInViewport.tsx'
import { TableLayout } from '@/layout/TableLayout.tsx'
import { useDeleteFailureReportMutation } from '@/services/generatedApi.ts'
import { useListFailureReportsInfiniteQuery } from '@/services/injectedApi.ts'
import { recordsCountText } from '@/utils/constants.ts'
import { formatDate, getAcademicYearEnd, getAcademicYearStart } from '@/utils/dateUtils.ts'
import { ActionIcon, Table } from '@mantine/core'
import { useForm } from '@mantine/form'
import { WrenchIcon } from '@phosphor-icons/react'
import React, { useMemo } from 'react'
import { Link } from 'react-router'

export function ViewFailures() {
  const form = useForm({
    mode: 'controlled',
    initialValues: {
      startDate: getAcademicYearStart(),
      endDate: getAcademicYearEnd(),
    }
  })
  const auth = useAuth()

  const query = useListFailureReportsInfiniteQuery({ ...form.getValues(), items: 20 })
  const [deleteRecord] = useDeleteFailureReportMutation()

  const ref = useFetchPageInViewport(query)
  const data = useMemo(() => query.data?.pages.flatMap(x => x.items) ?? [], [query.data])

  return (
    <TableLayout topBar={
      <>
        <NewRecordButton/>
        <AcademicYearPicker form={form}/>
      </>
    }>

      <Table.Thead>
        <Table.Tr>
          <Table.Th w="4%"></Table.Th>
          <Table.Th w="16%">Mokytojas</Table.Th>
          <Table.Th w="15%">Vieta</Table.Th>
          <Table.Th w="40%">Gedimo apibūdinimas</Table.Th>
          <Table.Th w="10%">Data</Table.Th>
          <Table.Th w="15%" ta="right" title={recordsCountText}>
            #{query.data?.pages[0].totalItems}
          </Table.Th>
        </Table.Tr>
      </Table.Thead>

      <Table.Tbody>
        {data.map((item, index) => (
          <Table.Tr
            key={item.id}
            ref={index === data.length - 5 ? ref : undefined}
          >
            <Table.Td pr="0">
              <CheckMarkIcon active={item.isFixed} tripleState/>
            </Table.Td>
            <Table.Td>{item.creatorName}</Table.Td>
            <Table.Td>{item.location}</Table.Td>
            <Table.Td>{item.details}</Table.Td>
            <Table.Td>
              {formatDate(item.reportDate)}
              {/*<span title="Pranešta">{formatDate(item.reportDate)}</span>*/}
              {/*{item.fixDate &&*/}
              {/*  <Text size="xs">*/}
              {/*    <span title="Atnaujinta">{formatDate(item.fixDate)}</span>*/}
              {/*  </Text>*/}
              {/*}*/}
            </Table.Td>
            <Table.Td ta="right">
              {auth.roles.has('Tech') &&
                <ActionIcon
                  component={Link}
                  to={{ pathname: `${item.id}/fix` }}
                  viewTransition
                  preventScrollReset={true}
                  title="Gedimas"
                  variant="subtle"
                  size="2.25rem"
                >
                  <WrenchIcon size="1.5rem"/>
                </ActionIcon>
              }
              {(auth.userId == item.creatorId || auth.roles.has('Admin')) && (
                <>
                  <EditButton to={item.id}/>
                  <DeleteButton onClick={() => deleteRecord(item.id)}/>
                </>
              )}
            </Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>

    </TableLayout>
  )
}