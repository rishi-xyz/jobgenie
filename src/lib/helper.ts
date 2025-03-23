type EntryProps = {
    title: string;
    organization: string;
    startDate: string;
    endDate?: string;
    description: string;
    current: boolean;
};

export function entriesToMarkdown(entries: EntryProps[], type: string) {
    if (!entries?.length) return "";

    return (
        `## ${escapeMarkdown(type)}\n\n` +
        entries
            .map((entry) => {
                const dateRange = entry.current
                    ? `${entry.startDate} - Present`
                    : `${entry.startDate} - ${entry.endDate}`;

                return (
                    `### ${escapeMarkdown(entry.title)} @ ${escapeMarkdown(
                        entry.organization
                    )}\n\n` +
                    `*${dateRange}*\n\n` +
                    `${escapeMarkdown(entry.description)}`
                );
            })
            .join("\n\n")
    );
}

function escapeMarkdown(text: string) {
    return text.replace(/([_*#])/g, "\\$1"); // Escapes *, _, and #
}
