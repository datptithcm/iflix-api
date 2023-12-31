import create from './create'
import updateById from './updateById'
import deleteById from './deleteById'
import getByMovieId from './getByMovieId'
import getByEpisodeId from './getByEpisodeId'
import getChildByParentId from './getChildByParenId'
import like from './like'
import dislike from './dislike'

const commentController = {
  create,
  updateById,
  deleteById,
  getByMovieId,
  getByEpisodeId,
  getChildByParentId,
  like,
  dislike
}

export default commentController