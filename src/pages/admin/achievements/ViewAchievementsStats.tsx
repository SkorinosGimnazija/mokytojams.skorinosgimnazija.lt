import { SimpleYearPicker } from '@/components/inputs/SimpleYearPicker.tsx'
import { PageLayout } from '@/layout/PageLayout.tsx'
import { useGetAchievementStatsQuery } from '@/services/generatedApi.ts'
import { getYearEnd, getYearStart } from '@/utils/dateUtils.ts'
import { Group, List } from '@mantine/core'
import { useForm } from '@mantine/form'
import React from 'react'

export function ViewAchievementsStats() {
  const form = useForm({
    mode: 'controlled',
    initialValues: {
      startDate: getYearStart(),
      endDate: getYearEnd(),
    }
  })

  const query = useGetAchievementStatsQuery({ ...form.getValues() })
  if (!query.data) {
    return null
  }

  return (
    <PageLayout topBar={<SimpleYearPicker form={form}/>}>

      <Group my="xl" gap="5rem" align="flex-start">
        <List>
          {query.data.typeStats.map((x) => (
            <List.Item key={x.id}>
              {x.name}: <b>{x.count}</b>
            </List.Item>
          ))}
        </List>

        <List>
          <List.Item>Renginiai: <b>{query.data.recordsCount}</b></List.Item>
          <List.Item>Mokytojai: <b>{query.data.teachersCount}</b></List.Item>
          <List.Item>Mokiniai: <b>{query.data.studentsCount}</b></List.Item>
        </List>
      </Group>

    </PageLayout>
  )
}