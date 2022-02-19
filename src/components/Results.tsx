import range from 'lodash/range'
import { Statistics } from './Statistics'
import { FunctionComponent } from 'react'
import { AssignableActivity, AssignableParticipant } from '../core/model'
import { MatchResult } from '../core/matcher'

type Props = {
    result: MatchResult
    participantsData: Record<string, string[]>
}

export const Results: FunctionComponent<Props> = ({
    result,
    participantsData
}) => {
    const findUnmatched = (participants: AssignableParticipant[]) =>
        participants.filter((participant) => !participant.assigned)

    const numberOfPriorities = (participants: AssignableParticipant[]) =>
        range(1, participants[0].priorities.length + 1)

    const buildActivityResultHeader = (activity: AssignableActivity) =>
        `${activity.title} (${activity.participants.length} / ${activity.limit})`

    return (
        <div id="results-root">
            <div id="results-config">
                <h2>Resultat</h2>
            </div>
            <Statistics result={result} />
            <div id="results-successful">
                <ul>
                    {result.activities.map((activity) => (
                        <li key={`result-${activity.id}`}>
                            <h3>{buildActivityResultHeader(activity)}</h3>
                            <table>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th />
                                        <th />
                                        <th />
                                        <th>Priorität</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {activity.participants.map(
                                        (participant, index) => (
                                            <tr
                                                key={`participant-${participant.id}`}
                                            >
                                                <td>{index + 1}</td>
                                                {participantsData[
                                                    participant.id
                                                ].map((p, i) => (
                                                    <td key={`property-${i}`}>
                                                        {p}
                                                    </td>
                                                ))}
                                                <td className="priority-column">
                                                    {participant.priorities.indexOf(
                                                        activity.id
                                                    ) + 1}
                                                </td>
                                            </tr>
                                        )
                                    )}
                                </tbody>
                            </table>
                        </li>
                    ))}
                </ul>
            </div>
            <div id="results-unassignable">
                <h3>Nicht-zuweisbare Teilnehmer</h3>
                {findUnmatched(result.participants).length > 0 && (
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th />
                                <th />
                                <th />
                                {numberOfPriorities(result.participants).map(
                                    (priority) => (
                                        <th key={priority}>
                                            Priorität {priority}
                                        </th>
                                    )
                                )}
                            </tr>
                        </thead>
                        <tbody>
                            {findUnmatched(result.participants).map(
                                (participant, index) => (
                                    <tr
                                        key={`participant-${participant.id}-${index}`}
                                    >
                                        <td>{index + 1}</td>
                                        {participantsData[participant.id].map(
                                            (p, i) => (
                                                <td key={`property-${i}`}>
                                                    {p}
                                                </td>
                                            )
                                        )}
                                        {participant.priorities.map(
                                            (priority) => (
                                                <td key={priority}>
                                                    {
                                                        result.activities.find(
                                                            (course) =>
                                                                course.id ===
                                                                priority
                                                        ).title
                                                    }
                                                </td>
                                            )
                                        )}
                                    </tr>
                                )
                            )}
                        </tbody>
                    </table>
                )}
            </div>
            <style jsx>{`
                table {
                    border-spacing: 0;
                    min-width: 350px;
                    max-width: 550px;
                }

                #results-unassignable table {
                    max-width: 800px;
                }

                .priority-column {
                    text-align: center;
                }

                ul {
                    margin: 0;
                    padding: 0;
                    list-style: none;
                }

                #results-root {
                    display: grid;
                    grid-template-columns: 450px auto;
                    grid-template-areas:
                        'config config'
                        'statistics statistics'
                        'unassignable unassignable'
                        'successful successful';
                }

                #results-config {
                    grid-area: config;
                }

                #results-successful {
                    grid-area: successful;
                }

                #results-unassignable {
                    grid-area: unassignable;
                }
            `}</style>
        </div>
    )
}
