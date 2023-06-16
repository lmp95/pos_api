export function ProductQuery(match, sort, perPage, currentPage) {
    const query = [
        { $match: match },
        {
            $sort: sort,
        },
        {
            $limit: perPage,
        },
        {
            $skip: perPage * currentPage,
        },
    ];
    return query;
}
