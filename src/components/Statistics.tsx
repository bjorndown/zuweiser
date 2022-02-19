import { BarChart } from './BarChart'
import {MatchResult} from '../core/matcher'
import {FunctionComponent} from 'react'

type Props = {
    result: MatchResult
}


export const Statistics:FunctionComponent<Props> = ({ result }) => {
    const getXLabel = (priority: number) => `${priority + 1}. Priorität`
    const computePriorityDistribution = (results: MatchResult): number[] => {
        const distribution: Record<string, number> = {}
        for (const activity of results.activities) {
            for (const participant of activity.participants) {
                const fullfilledPriority = participant.priorities.indexOf(activity.id)
                if (!distribution[getXLabel(fullfilledPriority)]) {
                    distribution[getXLabel(fullfilledPriority)] = 1
                } else {
                    distribution[getXLabel(fullfilledPriority)]++
                }
            }
        }
        return Object.keys(distribution).map(priority => distribution[priority])
    }
    return (
        <div id="statistics-root">
            <div id="statistics-overview">
                <h3>Zusammenfassung</h3>
                <table>
                    <thead>
                        <tr>
                            <th/>
                            <th>Zugewiesen</th>
                            <th>Minimum</th>
                            <th>Limit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {result.activities.map((activity) => (
                            <tr key={`activity-${activity.id}`}>
                                <td>{activity.title}</td>
                                <td className="number">
                                    {activity.participants.length}
                                </td>
                                <td className="number">{activity.minimum}</td>
                                <td className="number">{activity.limit}</td>
                            </tr>
                        ))}
                        <tr className="totals">
                            <td>Total</td>
                            <td className="number">
                                {
                                    result.participants.filter(
                                        (student) => student.assigned
                                    ).length
                                }
                            </td>
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
            </div>
            <div id="statistics-barchart">
                <h3>Verteilung der erf&uuml;llten Priorit&auml;ten</h3>
                <BarChart fulfilledPriorities={computePriorityDistribution(result)} totalParticipants={result.participants.length} />
            </div>
        </div>
    )
}
