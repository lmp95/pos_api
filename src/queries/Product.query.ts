export function ProductQuery(match, lookup, unwind, sort, perPage, currentPage) {
    const query = [
        { $match: match },
        { $lookup: lookup },
        unwind,
        {
            $sort: sort,
        },
        { $skip: currentPage * perPage },
        { $limit: perPage },
    ];
    return query;
}
