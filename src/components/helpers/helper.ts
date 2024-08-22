export const getPriorityColor = (priority: string) => {
    switch (priority) {
        case 'High':
            return 'bg-red-400/20 text-red-600';
        case 'Medium':
            return 'bg-yellow-400/20 text-yellow-600';
        case 'Low':
            return 'bg-green-400/20 text-green-600';
        default:
            return 'bg-gray-300 text-gray-600';
    }
};


