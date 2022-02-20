import React, { useEffect, useMemo, useState } from 'react'
import { CsvArea } from './CsvArea'
import { Explanation } from './Explanation'
import { Column } from './Participants'
import { Preview } from './Preview'
import { ActivitiesConfig, Activity } from '../core/model'

type Props = {
    onChange: (config: ActivitiesConfig) => void
}

type Columns = 'id' | 'title' | 'limit' | 'minimum'
type ActivitiesColumn = Column<Columns>

export const Activities = ({ onChange }: Props) => {
    const [shuffleBeforeMatch, setShuffleBeforeMatch] = useState(true)
    const [table, setTable] = useState<string[][] | undefined>()

    const isIdColumn = (column: string) => column.toLowerCase() === 'id'
    const isTitleColumn = (column: string) =>
        column.toLowerCase().startsWith('name') ||
        column.toLowerCase().startsWith('title')
    const isLimitColumn = (column: string) =>
        column.toLowerCase().startsWith('limit') ||
        column.toLowerCase().includes('max')
    const isMinimumColumn = (column: string) =>
        column.toLowerCase().startsWith('minimum')

    const columnHeads = useMemo(() => table?.[0] ?? [], [table])
    const rows = useMemo(() => table?.slice(1) ?? [], [table])

    const idColumnIndex = useMemo(
        () =>
            columnHeads.indexOf(
                columnHeads.find((heading) => isIdColumn(heading))
            ),
        [columnHeads]
    )
    const titleColumnIndex = useMemo(
        () =>
            columnHeads.indexOf(
                columnHeads.find((heading) => isTitleColumn(heading))
            ),
        [columnHeads]
    )
    const limitColumnIndex = useMemo(
        () =>
            columnHeads.indexOf(
                columnHeads.find((heading) => isLimitColumn(heading))
            ),
        [columnHeads]
    )
    const minimumColumnIndex = useMemo(
        () =>
            columnHeads.indexOf(
                columnHeads.find((heading) => isMinimumColumn(heading))
            ),
        [columnHeads]
    )

    const columns = useMemo<ActivitiesColumn[]>(() => {
        if (!columnHeads.length) {
            return []
        }

        return columnHeads.map((column, index) => {
            if (isIdColumn(column)) {
                return { label: column, matchedAsLabel: 'ID', matchedAs: 'id' }
            } else if (isTitleColumn(column)) {
                return {
                    label: column,
                    matchedAs: 'title',
                    matchedAsLabel: `Titel`
                }
            } else if (isLimitColumn(column)) {
                return {
                    label: column,
                    matchedAs: 'limit',
                    matchedAsLabel: `Limit`
                }
            } else if (isMinimumColumn(column)) {
                return {
                    label: column,
                    matchedAs: 'minimum',
                    matchedAsLabel: `Minimum`
                }
            } else {
                return {
                    label: column,
                    matchedAs: undefined,
                    matchedAsLabel: undefined
                }
            }
        })
    }, [columnHeads])

    const error = useMemo(() => {
        if (!table) {
            return
        }
        if (!columns || columns.length < 3) {
            return 'Keine oder zu wenige Spalten erkannt. Minimum an Spalten: ID, Titel, Limit, Minimum'
        }
        const hasId = !!columns.find((column) => column.matchedAs === 'id')
        if (!hasId) {
            return 'Spalte "ID" nicht erkannt'
        }
        const hasTitle = !!columns.find(
            (column) => column.matchedAs === 'title'
        )
        if (!hasTitle) {
            return 'Spalte "Titel" nicht erkannt'
        }

        const hasLimit = !!columns.find(
            (column) => column.matchedAs === 'limit'
        )
        if (!hasLimit) {
            return 'Spalte "Limit" nicht erkannt'
        }

        const hasMinimum = !!columns.find(
            (column) => column.matchedAs === 'minimum'
        )
        if (!hasMinimum) {
            return 'Spalte "Minimum" nicht erkannt'
        }
    }, [table, columns])

    const activities = useMemo<Activity[]>(() => {
        if (error || !rows.length) {
            return []
        }
        return rows.map((row) => ({
            id: row[idColumnIndex],
            title: row[titleColumnIndex],
            limit: parseInt(row[limitColumnIndex]),
            minimum: parseInt(row[minimumColumnIndex])
        }))
    }, [error, rows, columnHeads])

    useEffect(() => {
        if (!error) {
            onChange({ activities, shuffleBeforeMatch })
        }
    }, [error, activities, shuffleBeforeMatch])

    return (
        <div className="container">
            <h2>Aktivitäten</h2>
            <input
                type="checkbox"
                id="shuffleActivitiesBeforeMatch"
                checked={shuffleBeforeMatch}
                onChange={() => setShuffleBeforeMatch(!shuffleBeforeMatch)}
            />

            <label htmlFor="shuffleActivitiesBeforeMatch">
                Vor dem Zuweisen mischen
                <Explanation text="Ohne Mischen ist die Reihenfolge der Einträge in der Tabelle massgebend, d.h. frühe Einträge werden bevorzugt" />
            </label>
            <CsvArea onChange={(table) => setTable(table)} />
            <Preview error={error} columns={columns} table={table} />
            <style jsx>{`
              .container {
              min-width: 400px;
              flex: 1
              }
            `}</style>
        </div>
    )
}
