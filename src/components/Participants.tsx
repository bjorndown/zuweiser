import React, { useEffect, useMemo, useState } from 'react'
import { CsvArea } from './CsvArea'
import { Explanation } from './Explanation'
import { Preview } from './Preview'
import { AssignableParticipant, ParticipantsConfig } from '../core/model'

type Props = {
    onChange: (config: ParticipantsConfig | undefined) => void
}

type Columns = 'id' | 'priority'

type ParticipantColumns = Column<Columns>

export type Column<T = string> =
    | { label: string; matchedAs: T; matchedAsLabel: string }
    | { label: string; matchedAs: undefined; matchedAsLabel: undefined }

export const Participants = ({ onChange }: Props) => {
    const [shuffleBeforeMatch, setShuffleBeforeMatch] = useState(true)
    const [activitiesPerPerson, setActivitiesPerPerson] = useState(1)
    const [table, setTable] = useState<string[][] | undefined>()

    const isIdColumn = (column: string) => column.toLowerCase() === 'id'
    const isPriorityColumn = (column: string) =>
        column.toLowerCase().includes('prio') ||
        column.toLowerCase().includes('wahl')

    const columnHeads = useMemo(() => table?.[0] ?? [], [table])
    const rows = useMemo(() => table?.slice(1) ?? [], [table])
    const idColumnIndex = useMemo(
        () =>
            columnHeads.indexOf(
                columnHeads.find((heading) => isIdColumn(heading))
            ),
        [columnHeads]
    )
    const priorityColumnIndices = useMemo(
        () =>
            columnHeads
                .filter(isPriorityColumn)
                .map((column) => columnHeads.indexOf(column)),
        [columnHeads]
    )
    const otherAttributesColumns = useMemo(
        () =>
            columnHeads.filter(
                (column) => !isPriorityColumn(column) && !isIdColumn(column)
            ),
        [columnHeads]
    )

    const columns = useMemo<ParticipantColumns[]>(() => {
        if (!columnHeads.length) {
            return []
        }

        const priorityColumns = columnHeads.filter(isPriorityColumn)
        return columnHeads.map((column) => {
            if (isIdColumn(column)) {
                return { label: column, matchedAsLabel: 'ID', matchedAs: 'id' }
            } else if (isPriorityColumn(column)) {
                return {
                    label: column,
                    matchedAs: 'priority',
                    matchedAsLabel: `Priorität ${
                        priorityColumns.indexOf(column) + 1
                    }`
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
            return 'Keine oder zu wenige Spalten erkannt. Minimum an Spalten: ID, Priorität 1, Priorität 2'
        }
        const hasId = !!columns.find((column) => column.matchedAs === 'id')
        if (!hasId) {
            return 'Spalte "ID" nicht erkannt'
        }
        const numberOfPriorities = columns.filter(
            (column) => column.matchedAs === 'priority'
        ).length
        if (numberOfPriorities === 0) {
            return 'Keine Prioritäten-Spalten erkannt'
        }
        if (numberOfPriorities === 1) {
            return 'Nur eine Prioritäten-Spalten erkannt'
        }
    }, [table, columns])

    const participants = useMemo(() => {
        if (error || !table) {
            return []
        }
        return rows.map((row) => ({
            id: row[idColumnIndex],
            priorities: row.filter((_, index) =>
                priorityColumnIndices.includes(index)
            ),
            otherAttributes: row.filter(
                (_, index) =>
                    !priorityColumnIndices.concat(idColumnIndex).includes(index)
            )
        }))
    }, [error, table, rows, idColumnIndex, priorityColumnIndices])

    useEffect(() => {
        if (!error) {
            onChange({
                participants,
                shuffleBeforeMatch,
                activitiesPerPerson,
                prioritiesPerPerson: priorityColumnIndices.length,
                otherAttributesColumns
            })
        } else {
            onChange(undefined)
        }
    }, [
        error,
        participants,
        shuffleBeforeMatch,
        activitiesPerPerson,
        priorityColumnIndices,
        otherAttributesColumns
    ])

    return (
        <div className="container">
            <h2>Teilnehmer</h2>
            <label htmlFor="activitiesPerPerson">Aktivitäten pro Person</label>
            <input
                id="activitiesPerPerson"
                type="number"
                value={activitiesPerPerson}
                onChange={(event) =>
                    setActivitiesPerPerson(parseInt(event.target.value))
                }
                maxLength={1}
                size={3}
            />

            <input
                type="checkbox"
                id="shuffleParticipantsBeforeMatch"
                checked={shuffleBeforeMatch}
                onChange={() => setShuffleBeforeMatch(!shuffleBeforeMatch)}
            />
            <label htmlFor="shuffleParticipantsBeforeMatch">
                Vor dem Zuweisen mischen
                <Explanation text="Ohne Mischen ist die Reihenfolge der Einträge in der Tabelle massgebend, d.h. frühe Einträge werden bevorzugt" />
            </label>
            <CsvArea onChange={(table) => setTable(table)} />
            <Preview error={error} columns={columns} table={table} />
            <style jsx>{`
                .container {
                    min-width: 500px;
                    flex: 1;
                }
            `}</style>
        </div>
    )
}
