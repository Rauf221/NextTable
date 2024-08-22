export const getPriorityColor = (priority: string) => {
    switch (priority) {
        case 'High':
            return 'bg-red-500/10 text-red-500';
        case 'Medium':
            return 'bg-yellow-500/10 text-yellow-500';
        case 'Low':
            return 'bg-green-500/10 text-green-500';
        default:
            return 'bg-gray-200 text-gray-500';
    }
};


