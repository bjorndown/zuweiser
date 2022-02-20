# Zuweiser

## Screenshot

<a href="doc/demo.png">
    <img src="doc/demo.png" alt="Demo screenshot" style="width: 300px;"/>
</a>

## What does it do?!

Schools, companies etc often organize events where people can take part in various activities. The number participants
per activity is usually limited. Therefore organizers get people specify their priorities regarding the activities they
want to participate in. Then participants must be assigned to their activities according to their priorities.

Zuweiser takes care of that last step.

## Format

Zuweiser consumes tab-spaced text as produced by Excel and Libre-Office when copying the contents of a worksheet
with `Ctrl+A` `Ctrl+C`

Activities must contain the following columns

- ID (letters or numbers)
- Title
- Maximum number of participants
- Minimum number of participants

Participants must contain the following columns:

- ID (letters or numbers)
- N columns of priorities, referring to activities using their ID

Additional columns in the participant's data will be included in the result.

## Run locally

```
yarn
yarn dev
```

## Built with

[Next.js](https://nextjs.org/blog)
