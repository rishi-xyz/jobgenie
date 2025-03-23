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
        `## ${type}\n\n` +
        entries
            .map((entry) => {
                const dateRange = entry.current
                    ? `${entry.startDate} - Present`
                    : `${entry.startDate} - ${entry.endDate}`;
                return `### ${entry.title} @ ${entry.organization}\n\n*${dateRange}*\n\n${entry.description.replace(/\n/g, '\n\n')}`;
            })
            .join("\n\n")
    );
}