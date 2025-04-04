export const QUERY_PARAMS = {
    // Kategori filtresi
    SHOW_DELETED: 'showDeleted',
    
    // Gönderi filtreleri
    CATEGORY_ID: 'categoryId',
    PUBLISHED: 'published',
    TAGS: 'tags',  // Etiket filtresi için yeni parametre
    
    // Yorum filtreleri
    POST_ID: 'postId',
    COMMENTER_NAME: 'commenterName'
};

export const PAGINATION_PARAMS = {
    PAGE: 'page',
    LIMIT: 'limit',
    DEFAULT_PAGE: 1,
    DEFAULT_LIMIT: 10
};

export const SORT_PARAMS = {
    SORT_BY: 'sortBy',
    SORT_DIR: 'sortDir',
    ASC: 'asc',
    DESC: 'desc'
}; 