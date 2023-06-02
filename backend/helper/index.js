module.exports = {
  error400: (res, message) => {
    res.status(400).json({
      statusCode: 400,
      message,
    });
  },
  getPagingData: (data, page, limit) => {
    const { count: totalItems, rows: videos } = data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);

    return { totalItems, videos, totalPages, currentPage };
  },
  getPagination:(page, size) => {
    const limit = size ? +size : 3;
    const offset = page ? page * limit : 0;
    return { limit, offset };
  }
};
