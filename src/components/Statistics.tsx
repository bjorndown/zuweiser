import { BarChart } from './BarChart'
import { MatchResult } from '../core/matcher'
import { FunctionComponent } from 'react'
import _range from 'lodash/range'
import { ParticipantsConfig } from '../core/model'

type Props = {
    result: MatchResult
    particpantsConfig: ParticipantsConfig
}

export const Statistics: FunctionComponent<Props> = ({
    result,
    particpantsConfig
}) => {
    const getXLabel = (priority: number) => `${priority + 1}. Priorität`
    const computePriorityDistribution = (results: MatchResult): number[] => {
        const distribution: Record<string, number> = {}
        for (const activity of results.activities) {
            for (const execution of _range(1)) {
                for (const participant of activity.allParticipants()) {
                    const fullfilledPriority = participant.priorities.indexOf(
                        activity.id
                    )
                    if (!distribution[getXLabel(fullfilledPriority)]) {
                        distribution[getXLabel(fullfilledPriority)] = 1
                    } else {
                        distribution[getXLabel(fullfilledPriority)]++
                    }
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
