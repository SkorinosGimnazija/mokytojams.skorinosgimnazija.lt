import { SimpleYearPicker } from '@/components/inputs/SimpleYearPicker.tsx'
import { PageLayout } from '@/layout/PageLayout.tsx'
import { useGetCourseStatsQuery } from '@/services/generatedApi.ts'
import { getYearEnd, getYearStart } from '@/utils/dateUtils.ts'
import { Group, List } from '@mantine/core'
import { useForm } from '@mantine/form'
import React from 'react'

export function ViewCourseStats() {
  const form = useForm({
    mode: 'controlled',
    initialValues: {
      startDate: getYearStart(),
      endDate: getYearEnd(),
    }
  })

  const query = useGetCourseStatsQuery({ ...form.getValues() })
  if (!query.data) {
    return null
  }

  return (
    <PageLayout topBar={<SimpleYearPicker form={form}/>}>
      <Group my="xl" gap="5rem" align="flex-start">
        <List>
          {query.data.teachers.map((x) => (
            <List.Item key={x.id}>
              {x.name}: <b>{x.recordsCount}</b> (<b>{x.totalDuration}</b> val.)
            </List.Item>
          ))}
        </List>

        <List>
          <List.Item>Kursai: <b>{query.data.recordsCount}</b></List.Item>
          <List.Item>Valandos: <b>{query.data.totalDuration}</b></List.Item>
        </List>

      </Group>
    </PageLayout>
  )
}