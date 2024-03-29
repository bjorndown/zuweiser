import { BarChart } from './BarChart'
import { MatchResult } from '../core/matcher'
import { FunctionComponent } from 'react'
import _range from 'lodash/range'
import { ParticipantsConfig } from '../core/model'
import {Explanation} from './Explanation'

type Props = {
    result: MatchResult
    particpantsConfig: ParticipantsConfig
}

export const Statistics: FunctionComponent<Props> = ({
    result,
    particpantsConfig
}) => {
    const computePriorityDistribution = (results: MatchResult): number[] => {
        const distribution: Record<string, number> = {}
        for (const activity of results.activities) {
            for (const participant of activity.allParticipants()) {
                const fulfilledPriority = participant.priorities.indexOf(
                    activity.id
                )
                if (!distribution[fulfilledPriority]) {
                    distribution[fulfilledPriority] = 1
                } else {
                    distribution[fulfilledPriority]++
                }
            }
        }
        return Object.keys(distribution).map(
            (priority) => distribution[priority]
        )
    }
    return (
        <div>
            <article className="statistics">
                <section>
                    <h3>Kurzübersicht</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Kurs</th>
                                {_range(
                                    0,
                                    particpantsConfig.activitiesPerPerson
                                ).map((execution) => (
                                    <th>Durchführung {execution + 1}</th>
                                ))}
                                <th>Minimum</th>
                                <th>Limit</th>
                            </tr>
                        </thead>
                        <tbody>
                            {result.activities.map((activity) => (
                                <tr key={`activity-${activity.id}`}>
                                    <td>{activity.title}</td>
                                    {_range(
                                        0,
                                        particpantsConfig.activitiesPerPerson
                                    ).map((execution) => (
                                        <td className="number">
                                            {
                                                activity.participants[
                                                    execution + 1
                                                ]?.length
                                            }
                                        </td>
                                    ))}
                                    <td className="number">
                                        {activity.minimum}
                                    </td>
                                    <td className="number">{activity.limit}</td>
                                </tr>
                            ))}
                            <tr className="totals">
                                <td>Total</td>
                                {_range(
                                    0,
                                    particpantsConfig.activitiesPerPerson
                                ).map((execution) => (
                                    <td className="number">
                                        {result.activities.reduce(
                                            (sum, activity) =>
                                                activity.participantsByExecution(
                                                    execution + 1
                                                ).length + sum,
                                            0
                                        )}
                                    </td>
                                ))}

                                <td className="number">
                                    {result.activities
                                        .map((course) => course.minimum)
                                        .reduce(
                                            (partialSum, minimum) =>
                                                partialSum + minimum
                                        )}
                                </td>
                                <td className="number">
                                    {result.activities
                                        .map((course) => course.limit)
                                        .reduce(
                                            (partialSum, limit) =>
                                                partialSum + limit
                                        )}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </section>
                <section>
                    <h3>Verteilung der erf&uuml;llten Priorit&auml;ten</h3>
                    <BarChart
                        fulfilledPriorities={computePriorityDistribution(
                            result
                        )}
                        totalParticipants={result.participants.length}
                    />
                    <h3>Gesamtbewertung</h3>
                    <p>
                        <>
                        {result.participants.reduce(
                            (scoreSum, participant) =>
                                scoreSum + participant.score(),
                            0
                        )}
                            <Explanation text="Je tiefer dieser Wert ist, desto besser. Er ist die Summe der erfüllten Prioritäten pro Teilnehmer:in. Beispiel: Wird jemand seiner 1. und 5. Priorität zugewiesen, dann ist ihre Bewertung 1 + 5 = 6. Eine fehlende Zuweisung wird mit der Anzahl Prioritäten gewertet."/>
                        </>
                    </p>
                </section>
            </article>
            <style jsx>{`
                .statistics {
                    display: flex;
                    flex-flow: row wrap;
                    gap: 1rem;
                }
            `}</style>
        </div>
    )
}
