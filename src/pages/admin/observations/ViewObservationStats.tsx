import { AcademicYearPicker } from '@/components/inputs/AcademicYearPicker.tsx'
import { PageLayout } from '@/layout/PageLayout.tsx'
import {
  useGetObservationStatsQuery,
  useListObservationOptionsQuery,
  useListObservationStudentsQuery
} from '@/services/generatedApi.ts'
import { getAcademicYearEnd, getAcademicYearStart } from '@/utils/dateUtils.ts'
import { List, Select, Stack, Text } from '@mantine/core'
import { useForm } from '@mantine/form'
import dayjs from 'dayjs'
import React, { Activity, lazy, Suspense, useMemo } from 'react'

const LineChart = lazy(() =>
  import('@mantine/charts').then((module) => ({ default: module.LineChart }))
)

export function ViewObservationStats() {
  const form = useForm({
    mode: 'controlled',
    initialValues: {
      studentId: 0,
      startDate: getAcademicYearStart(),
      endDate: getAcademicYearEnd(),
    }
  })

  const optionsQuery = useListObservationOptionsQuery()
  const studentsQuery = useListObservationStudentsQuery(false)

  const query = useGetObservationStatsQuery({ ...form.getValues() }, { skip: !form.getValues().studentId })

  const chartData = useMemo(() => {
    if (!query.data) {
      return []
    }

    return Object.entries(query.data.stats)
      .map(([date, values]) => ({ ...values, month: dayjs(date).format('MMMM') }))
  }, [query.data])

  return (
    <PageLayout
      topBar={
        <>
          <Select
            {...form.getInputProps('studentId')}
            placeholder="Mokinys"
            allowDeselect={false}
            data={studentsQuery.data?.map(x => ({ value: String(x.id), label: x.name })) ?? []}
            searchable
          />

          <AcademicYearPicker form={form}/>
        </>
      }
    >
      <Suspense>
        <Activity mode={query.data ? 'visible' : 'hidden'}>

          <Stack pr="2rem" gap="8rem">
            {optionsQuery.data?.map((item) =>
              <LineChart
                key={item.id}
                h={300}
                miw={300}
                mih={200}
                data={chartData}
                withLegend
                tickLine="x"
                tooltipAnimationDuration={200}
                dataKey="month"
                gridAxis="y"
                curveType="monotone"
                series={[{ name: String(item.id), label: item.name }]}
              />)
            }
          </Stack>

          <Stack my="4rem" px="2rem">

            <Text>Pastabos:</Text>
            <List>
              {query.data?.notes.map((item) =>
                <List.Item key={item.id}>{item.text} ({item.creatorName})</List.Item>
              )}
            </List>

            <Text>Įrašų skaičius:</Text>
            <List>
              {query.data?.teacherRecordsCount.map((item) =>
                <List.Item key={item.id}>{item.name}: <b>{item.count}</b></List.Item>
              )}
            </List>

          </Stack>

        </Activity>
      </Suspense>

    </PageLayout>
  )
}