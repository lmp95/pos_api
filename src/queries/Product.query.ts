export function ProductQuery(match, sort, perPage, currentPage) {
    const query = [
        { $match: match },
        {
            $sort: sort,
        },
        { $skip: currentPage * perPage },
        { $limit: perPage },
    ];
    return query;
}
