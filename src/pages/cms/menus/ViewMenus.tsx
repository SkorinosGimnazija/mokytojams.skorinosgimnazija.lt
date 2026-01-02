import { DeleteButton } from '@/components/buttons/DeleteButton.tsx'
import { EditButton } from '@/components/buttons/EditButton.tsx'
import { NewRecordButton } from '@/components/buttons/NewRecordButton.tsx'
import { CheckMarkIcon } from '@/components/icons/CheckMarkIcon.tsx'
import { LanguagePicker } from '@/components/inputs/LanguagePicker.tsx'
import { TableLayout } from '@/layout/TableLayout.tsx'
import { useDeleteMenuMutation, useListMenusQuery } from '@/services/generatedApi.ts'
import { recordsCountText } from '@/utils/constants.ts'
import { Table } from '@mantine/core'
import { useForm } from '@mantine/form'
import React from 'react'

export function ViewMenus() {
  const form = useForm({
    mode: 'controlled',
    initialValues: {
      languageId: ''
    }
  })

  const query = useListMenusQuery(form.getValues().languageId || undefined, {
    selectFromResult: ({ data }) => ({
      data: data?.flatMap(x =>
        [
          { ...x, level: 1 },
          ...(x.children?.map(child => ({ ...child, level: 2 })) ?? [])
        ])
    })
  })

  const [deleteRecord] = useDeleteMenuMutation()

  return (
    <TableLayout topBar={
      <>
        <NewRecordButton/>
        <LanguagePicker form={form} placeholder="Kalba" clearable/>
      </>
    }>
      <Table.Thead>
        <Table.Tr>
          <Table.Th w="4%"></Table.Th>
          <Table.Th w="46%">Pavadinimas</Table.Th>
          <Table.Th w="20%">Kalba</Table.Th>
          <Table.Th w="15%">Eilė</Table.Th>
          <Table.Th w="15%" ta="right" title={recordsCountText}>#{query.data?.length}</Table.Th>
        </Table.Tr>
      </Table.Thead>

      <Table.Tbody>
        {query.data?.map((item) => (
          <Table.Tr key={item.id}>
            <Table.Td pr="0">
              <CheckMarkIcon active={item.isPublished}/>
            </Table.Td>
            <Table.Td pl={item.level * 16}>{item.title}</Table.Td>
            <Table.Td>{item.languageName} {item.isHidden && '(Paslėptas)'}</Table.Td>
            <Table.Td>{item.order}</Table.Td>
            <Table.Td ta="right">
              <EditButton to={item.id}/>
              <DeleteButton onClick={() => deleteRecord(item.id)}/>
            </Table.Td>
          </Table.Tr>
        ))}
      </Table.Tbody>
    </TableLayout>
  )
}