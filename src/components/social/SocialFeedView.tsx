import React, { useState } from 'react';
import { SocialPost, StoryPulse, UserProfile, LocationInfo, MarketplaceItem } from '../../types';
import { UserAvatar, ItemVisual } from '../common/VisualFallback';
import { 
  Heart, 
  MessageSquare, 
  Share2, 
  Send, 
  MapPin, 
  Sparkles, 
  ShoppingBag, 
  X, 
  Check, 
  Smile, 
  Flame, 
  Zap 
} from 'lucide-react';

interface SocialFeedViewProps {
  posts: SocialPost[];
  stories: StoryPulse[];
  users: UserProfile[];
  currentUser: UserProfile;
  currentLocation: LocationInfo;
  items: MarketplaceItem[];
  onLikePost: (postId: string) => void;
  onAddComment: (postId: string, text: string) => void;
  onCreatePost: (post: SocialPost) => void;
  onSelectItem: (item: MarketplaceItem) => void;
  onStartChat: (userId: string, initialMessage: string) => void;
}

const VIBE_TAGS = ['Studio Life', 'Local Meetup', 'Global Soundscapes', 'Design & Architecture', 'Marketplace Drop', 'Weekend Vibe'];

const THEME_GRADIENTS = [
  { label: 'Sunset Warmth', value: 'from-amber-500/10 via-orange-500/5 to-transparent' },
  { label: 'Deep Indigo', value: 'from-blue-500/10 via-indigo-500/5 to-transparent' },
  { label: 'Rose Gold', value: 'from-rose-500/10 via-pink-500/5 to-transparent' },
  { label: 'Emerald Forest', value: 'from-emerald-500/10 via-teal-500/5 to-transparent' },
  { label: 'Minimal Monochrome', value: 'from-neutral-200/50 via-neutral-100/30 to-transparent' }
];

export const SocialFeedView: React.FC<SocialFeedViewProps> = ({
  posts,
  stories,
  users,
  currentUser,
  currentLocation,
  items,
  onLikePost,
  onAddComment,
  onCreatePost,
  onSelectItem,
  onStartChat,
}) => {
  const [newPostContent, setNewPostContent] = useState('');
  const [selectedTag, setSelectedTag] = useState(VIBE_TAGS[0]);
  const [selectedGradient, setSelectedGradient] = useState(THEME_GRADIENTS[0].value);
  const [linkedItemId, setLinkedItemId] = useState<string>('');
  const [activeStory, setActiveStory] = useState<StoryPulse | null>(null);
  const [commentInputs, setCommentInputs] = useState<{ [postId: string]: string }>({});
  const [expandedComments, setExpandedComments] = useState<{ [postId: string]: boolean }>({});
  const [copiedPostId, setCopiedPostId] = useState<string | null>(null);

  // Map users for fast lookup
  const userMap = new Map<string, UserProfile>();
  users.forEach(u => userMap.set(u.id, u));

  // Map items for fast lookup
  const itemMap = new Map<string, MarketplaceItem>();
  items.forEach(i => itemMap.set(i.id, i));

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostContent.trim()) return;

    const newPost: SocialPost = {
      id: `post_${Date.now()}`,
      authorId: currentUser.id,
      content: newPostContent,
      location: currentLocation,
      createdAt: 'Just now',
      likes: 1,
      hasLiked: true,
      comments: [],
      shares: 0,
      vibeTag: selectedTag,
      themeGradient: selectedGradient,
      linkedListingId: linkedItemId || undefined
    };

    onCreatePost(newPost);
    setNewPostContent('');
    setLinkedItemId('');
  };

  const handleCommentSubmit = (postId: string) => {
    const text = commentInputs[postId]?.trim();
    if (!text) return;
    onAddComment(postId, text);
    setCommentInputs({ ...commentInputs, [postId]: '' });
    setExpandedComments({ ...expandedComments, [postId]: true });
  };

  const handleShare = (postId: string) => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedPostId(postId);
    setTimeout(() => setCopiedPostId(null), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 space-y-8">
      {/* Stories / Vibe Pulses Bar */}
      <div>
        <div className="flex items-center justify-between mb-3 px-1">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
            Global & Local Vibe Pulses
          </h2>
          <span className="text-xs text-neutral-400">24-hour stories</span>
        </div>

        <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
          {/* User's own story create pill */}
          <div className="shrink-0 flex flex-col items-center gap-1.5 w-20 text-center cursor-pointer group">
            <div className="w-16 h-16 rounded-2xl bg-neutral-100 border-2 border-dashed border-neutral-300 flex flex-col items-center justify-center text-neutral-500 group-hover:border-neutral-900 group-hover:text-neutral-900 transition-colors">
              <span className="text-xl font-bold">+</span>
              <span className="text-[10px] font-medium">Add Pulse</span>
            </div>
            <span className="text-[11px] font-medium text-neutral-600 truncate max-w-full">
              Your Vibe
            </span>
          </div>

          {/* Seed stories */}
          {stories.map(story => {
            const author = userMap.get(story.authorId);
            if (!author) return null;
            return (
              <button
                key={story.id}
                type="button"
                onClick={() => setActiveStory(story)}
                className="shrink-0 flex flex-col items-center gap-1.5 w-20 text-center cursor-pointer group focus:outline-none"
              >
                <div className={`p-0.5 rounded-2xl bg-gradient-to-tr ${story.gradient} shadow-sm group-hover:scale-105 transition-transform duration-200`}>
                  <div className="w-16 h-16 rounded-[14px] bg-white p-0.5 flex flex-col items-center justify-center relative overflow-hidden">
                    <UserAvatar name={author.name} avatarBg={author.avatarBg} size="md" />
                    <span className="absolute bottom-1 right-1 text-[10px] drop-shadow">
                      {author.location.flag}
                    </span>
                  </div>
                </div>
                <span className="text-[11px] font-medium text-neutral-700 truncate max-w-full group-hover:text-neutral-900">
                  {author.name.split(' ')[0]}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Post Creator Box */}
      <div className="bg-white rounded-3xl border border-neutral-200/90 p-5 shadow-xs">
        <form onSubmit={handlePostSubmit} className="space-y-4">
          <div className="flex items-start gap-3">
            <UserAvatar 
              name={currentUser.name} 
              avatarBg={currentUser.avatarBg} 
              size="md" 
              verified={currentUser.verified} 
            />
            <div className="flex-1">
              <textarea
                rows={3}
                value={newPostContent}
                onChange={e => setNewPostContent(e.target.value)}
                placeholder={`What's your vibe today, ${currentUser.name.split(' ')[0]}? Share local happenings, creative projects, or discussions...`}
                className="w-full text-sm placeholder-neutral-400 focus:outline-none resize-none"
              />
            </div>
          </div>

          {/* Vibe tag and gradient style selectors */}
          <div className="pt-3 border-t border-neutral-100 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
              <span className="text-neutral-400 font-medium shrink-0">Tag:</span>
              {VIBE_TAGS.map(tag => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setSelectedTag(tag)}
                  className={`px-2.5 py-1 rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                    selectedTag === tag
                      ? 'bg-neutral-900 text-white font-medium shadow-xs'
                      : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                  }`}
                >
                  #{tag}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              {/* Optional link to item dropdown */}
              {items.length > 0 && (
                <select
                  value={linkedItemId}
                  onChange={e => setLinkedItemId(e.target.value)}
                  className="px-2.5 py-1.5 rounded-lg border border-neutral-200 bg-white text-neutral-600 text-xs focus:outline-none"
                >
                  <option value="">Attach Marketplace Item (Optional)</option>
                  {items.slice(0, 6).map(it => (
                    <option key={it.id} value={it.id}>
                      Attach: {it.title.slice(0, 28)}... (${it.price})
                    </option>
                  ))}
                </select>
              )}

              <button
                type="submit"
                disabled={!newPostContent.trim()}
                className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 disabled:opacity-40 text-white font-semibold rounded-xl text-xs shadow-sm transition-all flex items-center gap-1.5 shrink-0"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Share Vibe</span>
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Posts Stream */}
      <div className="space-y-6">
        {posts.map(post => {
          const author = userMap.get(post.authorId) || currentUser;
          const linkedItem = post.linkedListingId ? itemMap.get(post.linkedListingId) : undefined;
          const isCommentsOpen = expandedComments[post.id];

          return (
            <article 
              key={post.id}
              className={`bg-white rounded-3xl border border-neutral-200/90 overflow-hidden shadow-xs hover:border-neutral-300 transition-all bg-gradient-to-b ${post.themeGradient}`}
            >
              <div className="p-5 sm:p-6 space-y-4">
                {/* Author row */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <UserAvatar 
                      name={author.name} 
                      avatarBg={author.avatarBg} 
                      size="md" 
                      verified={author.verified} 
                    />
                    <div>
                      <div className="font-bold text-neutral-900 text-sm flex items-center gap-1">
                        <span>{author.name}</span>
                        <span className="font-normal text-neutral-400 text-xs">{author.handle}</span>
                      </div>
                      {/* Zero-pill metadata */}
                      <div className="flex items-center gap-1.5 text-xs text-neutral-500">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-neutral-400" />
                          {post.location.city} {post.location.flag}
                        </span>
                        <span>·</span>
                        <span>{post.createdAt}</span>
                        <span>·</span>
                        <span className="font-medium text-neutral-700">#{post.vibeTag}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => onStartChat(author.id, `Hi ${author.name}, saw your post about "${post.vibeTag}"!`)}
                    className="text-xs font-semibold text-neutral-600 hover:text-neutral-900 px-3 py-1.5 rounded-lg hover:bg-neutral-100 transition-colors"
                  >
                    Say Hi
                  </button>
                </div>

                {/* Content text */}
                <p className="text-sm sm:text-base text-neutral-800 leading-relaxed whitespace-pre-line">
                  {post.content}
                </p>

                {/* Optional Attached Marketplace Item Preview */}
                {linkedItem && (
                  <div 
                    onClick={() => onSelectItem(linkedItem)}
                    className="p-3.5 rounded-2xl bg-white/90 border border-neutral-200 hover:border-neutral-400 transition-all cursor-pointer shadow-xs flex items-center gap-4 group"
                  >
                    <div className="w-20 h-16 rounded-xl overflow-hidden shrink-0">
                      <ItemVisual type={linkedItem.visualType} aspectRatio="4:3" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 text-[11px] text-neutral-500">
                        <ShoppingBag className="w-3 h-3 text-rose-500" />
                        <span>Marketplace Listing</span>
                        <span>·</span>
                        <span>{linkedItem.location.city}</span>
                      </div>
                      <h4 className="font-semibold text-neutral-900 text-xs sm:text-sm truncate group-hover:text-rose-600 transition-colors">
                        {linkedItem.title}
                      </h4>
                      <div className="text-xs font-bold text-neutral-900 tabular-nums">
                        ${linkedItem.price.toLocaleString()} {linkedItem.currency}
                      </div>
                    </div>
                    <div className="text-xs font-semibold text-neutral-700 px-3 py-1 rounded-lg bg-neutral-100 group-hover:bg-neutral-900 group-hover:text-white transition-colors">
                      View
                    </div>
                  </div>
                )}

                {/* Interaction Action Row (Likes, Comments, Share) */}
                <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-600">
                  <div className="flex items-center gap-4">
                    {/* Like / Vibe button */}
                    <button
                      type="button"
                      onClick={() => onLikePost(post.id)}
                      className={`flex items-center gap-1.5 transition-colors font-medium ${
                        post.hasLiked ? 'text-rose-600 font-semibold' : 'hover:text-neutral-900'
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${post.hasLiked ? 'fill-rose-500 text-rose-500' : ''}`} />
                      <span className="tabular-nums">{post.likes}</span>
                    </button>

                    {/* Comment toggle button */}
                    <button
                      type="button"
                      onClick={() => setExpandedComments({
                        ...expandedComments,
                        [post.id]: !isCommentsOpen
                      })}
                      className="flex items-center gap-1.5 hover:text-neutral-900 transition-colors font-medium"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span className="tabular-nums">{post.comments.length}</span>
                    </button>
                  </div>

                  {/* Share button */}
                  <button
                    type="button"
                    onClick={() => handleShare(post.id)}
                    className="flex items-center gap-1 hover:text-neutral-900 transition-colors relative"
                    title="Copy post link"
                  >
                    <Share2 className="w-4 h-4" />
                    <span>Share</span>
                    {copiedPostId === post.id && (
                      <span className="absolute -top-7 right-0 text-[10px] bg-neutral-900 text-white px-2 py-0.5 rounded shadow">
                        Copied!
                      </span>
                    )}
                  </button>
                </div>

                {/* Comment Section (Expandable or Inline) */}
                {(isCommentsOpen || post.comments.length > 0) && (
                  <div className="pt-3 mt-2 border-t border-neutral-100 space-y-3">
                    {/* Existing Comments List */}
                    <div className="space-y-2">
                      {post.comments.map(comment => {
                        const commentAuthor = userMap.get(comment.authorId) || currentUser;
                        return (
                          <div key={comment.id} className="flex items-start gap-2.5 text-xs bg-neutral-50/80 p-2.5 rounded-xl">
                            <UserAvatar name={commentAuthor.name} avatarBg={commentAuthor.avatarBg} size="sm" />
                            <div className="flex-1">
                              <div className="flex items-baseline gap-2">
                                <span className="font-semibold text-neutral-900">{commentAuthor.name}</span>
                                <span className="text-[10px] text-neutral-400">{comment.createdAt}</span>
                              </div>
                              <p className="text-neutral-700 mt-0.5">{comment.text}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* New comment input */}
                    <div className="flex items-center gap-2 pt-1">
                      <UserAvatar name={currentUser.name} avatarBg={currentUser.avatarBg} size="sm" />
                      <input
                        type="text"
                        value={commentInputs[post.id] || ''}
                        onChange={e => setCommentInputs({ ...commentInputs, [post.id]: e.target.value })}
                        onKeyDown={e => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleCommentSubmit(post.id);
                          }
                        }}
                        placeholder="Write a comment or vibe back..."
                        className="flex-1 px-3 py-2 text-xs rounded-xl border border-neutral-200 bg-white focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:border-transparent"
                      />
                      <button
                        type="button"
                        onClick={() => handleCommentSubmit(post.id)}
                        disabled={!commentInputs[post.id]?.trim()}
                        className="p-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 disabled:opacity-40 text-white transition-colors"
                      >
                        <Send className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </article>
          );
        })}
      </div>

      {/* Story Viewer Modal */}
      {activeStory && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setActiveStory(null)}
        >
          <div 
            className="w-full max-w-sm bg-neutral-900 text-white rounded-3xl overflow-hidden shadow-2xl border border-neutral-800 flex flex-col relative aspect-[9/16]"
            onClick={e => e.stopPropagation()}
          >
            {/* Top progress bar */}
            <div className="absolute top-3 inset-x-3 z-20 flex gap-1">
              <div className="h-1 flex-1 bg-white/90 rounded-full animate-pulse" />
            </div>

            {/* Author bar */}
            {(() => {
              const storyAuthor = userMap.get(activeStory.authorId);
              return (
                <div className="absolute top-6 inset-x-4 z-20 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    {storyAuthor && (
                      <UserAvatar name={storyAuthor.name} avatarBg={storyAuthor.avatarBg} size="sm" />
                    )}
                    <div>
                      <div className="text-xs font-bold text-white leading-tight">
                        {storyAuthor?.name}
                      </div>
                      <div className="text-[10px] text-white/70">
                        {activeStory.location} · {activeStory.timeAgo}
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={() => setActiveStory(null)}
                    className="p-1 rounded-full bg-black/40 text-white hover:bg-black/70"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              );
            })()}

            {/* Story Visual Backdrop */}
            <div className={`flex-1 bg-gradient-to-br ${activeStory.gradient} flex flex-col justify-end p-6 relative`}>
              <div className="absolute inset-0 bg-black/20" />
              <div className="relative z-10 space-y-4">
                <div className="p-4 rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 text-white">
                  <p className="text-sm font-medium leading-relaxed">
                    "{activeStory.caption}"
                  </p>
                </div>

                {/* Quick reply bar */}
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Reply to story..."
                    className="flex-1 px-3.5 py-2 text-xs bg-white/20 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-1 focus:ring-white"
                  />
                  <button
                    onClick={() => {
                      onStartChat(activeStory.authorId, `Loved your story in ${activeStory.location}: "${activeStory.caption}"`);
                      setActiveStory(null);
                    }}
                    className="px-3 py-2 bg-white text-neutral-900 rounded-xl text-xs font-bold hover:bg-white/90 transition-colors"
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
