"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useParams } from "next/navigation";
import { HiChevronLeft, HiChatAlt2, HiUsers, HiLockClosed, HiDotsVertical, HiFlag, HiHeart, HiChevronDown, HiChevronUp } from "react-icons/hi";
import { getCircleById, POST_TYPES, REACTION_TYPES } from "@/lib/circles";
import { generatePseudonym } from "@/lib/pseudonyms";

interface Post {
  id: string;
  pseudonym: string;
  avatarColor: string;
  avatarEmoji: string;
  type: string;
  content: string;
  contentWarning: string | null;
  reactions: { heart: number; hug: number; strength: number; seen: number };
  commentCount: number;
  createdAt: string;
}

// Demo posts
const DEMO_POSTS: Post[] = [
  {
    id: "1",
    pseudonym: "Blue Elephant",
    avatarColor: "#60A5FA",
    avatarEmoji: "🐘",
    type: "venting",
    content: "I can't take it anymore. My parents keep comparing me to my cousin who got into IIT. I'm in a good college too but nothing is ever enough. Log kya kahenge is literally killing me inside.",
    contentWarning: null,
    reactions: { heart: 24, hug: 18, strength: 12, seen: 8 },
    commentCount: 7,
    createdAt: "2 hours ago",
  },
  {
    id: "2",
    pseudonym: "Purple Deer",
    avatarColor: "#A78BFA",
    avatarEmoji: "🦌",
    type: "seeking_advice",
    content: "Feeling stuck in my job. Every day is the same. I want to quit and pursue what I love but everyone's saying it's risky. How do I know if I'm making the right decision?",
    contentWarning: null,
    reactions: { heart: 15, hug: 8, strength: 22, seen: 5 },
    commentCount: 12,
    createdAt: "4 hours ago",
  },
  {
    id: "3",
    pseudonym: "Green Fox",
    avatarColor: "#34D399",
    avatarEmoji: "🦊",
    type: "celebration",
    content: "Small win but I finally talked to a therapist. It took me months to gather courage but I'm glad I did. To anyone hesitating - just book the appointment. You deserve support.",
    contentWarning: null,
    reactions: { heart: 67, hug: 45, strength: 34, seen: 28 },
    commentCount: 23,
    createdAt: "6 hours ago",
  },
];

export default function CirclePage() {
  const params = useParams();
  const circleId = params.id as string;
  const circle = getCircleById(circleId);
  
  const [posts, setPosts] = useState(DEMO_POSTS);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [showCompose, setShowCompose] = useState(false);
  const [newPost, setNewPost] = useState("");
  const [postType, setPostType] = useState("venting");
  const [showWarning, setShowWarning] = useState(false);
  const [expandedPost, setExpandedPost] = useState<string | null>(null);

  if (!circle) {
    return (
      <div className="min-h-screen bg-[var(--background)] flex items-center justify-center">
        <p className="text-[var(--text-muted)]">Circle not found</p>
      </div>
    );
  }

  const filteredPosts = selectedType
    ? posts.filter((p) => p.type === selectedType)
    : posts;

  const handleReact = (postId: string, reactionType: string) => {
    setPosts(posts.map((post) => {
      if (post.id === postId) {
        return {
          ...post,
          reactions: {
            ...post.reactions,
            [reactionType]: (post.reactions as Record<string, number>)[reactionType] + 1,
          },
        };
      }
      return post;
    }));
  };

  const handleCreatePost = () => {
    if (!newPost.trim()) return;
    
    const pseudonym = generatePseudonym();
    const newPostObj = {
      id: `post_${Date.now()}`,
      pseudonym: pseudonym.pseudonym,
      avatarColor: pseudonym.color,
      avatarEmoji: pseudonym.emoji,
      type: postType,
      content: newPost,
      contentWarning: showWarning ? "Sensitive content" : null as string | null,
      reactions: { heart: 0, hug: 0, strength: 0, seen: 0 },
      commentCount: 0,
      createdAt: "Just now",
    };
    
    setPosts([newPostObj, ...posts]);
    setNewPost("");
    setShowCompose(false);
  };

  return (
    <div className="min-h-screen bg-[var(--background)]">
      {/* Header */}
      <div className="bg-[var(--surface)] border-b border-[var(--surface-hover)] sticky top-0 z-10">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4 mb-4">
            <Link href="/circles" className="text-[var(--text-muted)] hover:text-[var(--primary)]">
              <HiChevronLeft className="w-6 h-6" />
            </Link>
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                style={{ backgroundColor: `${circle.color}20` }}
              >
                {circle.emoji}
              </div>
              <div>
                <h1 className="font-bold text-[var(--text-primary)]">
                  {circle.name}
                </h1>
                <div className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
                  <HiUsers className="w-3 h-3" />
                  {circle.memberCount.toLocaleString()}
                  <span className="mx-1">·</span>
                  <HiLockClosed className="w-3 h-3" />
                  Anonymous
                </div>
              </div>
            </div>
          </div>

          {/* Post Type Filter */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            <button
              onClick={() => setSelectedType(null)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                selectedType === null
                  ? "bg-[var(--primary)] text-white"
                  : "bg-[var(--background)] text-[var(--text-secondary)]"
              }`}
            >
              All
            </button>
            {POST_TYPES.map((type) => (
              <button
                key={type.id}
                onClick={() => setSelectedType(type.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                  selectedType === type.id
                    ? "bg-[var(--primary)] text-white"
                    : "bg-[var(--background)] text-[var(--text-secondary)]"
                }`}
              >
                {type.emoji} {type.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6">
        {/* Compose Button */}
        <motion.button
          onClick={() => setShowCompose(!showCompose)}
          className="w-full bg-[var(--surface)] rounded-2xl p-4 border border-[var(--surface-hover)] text-left mb-4 hover:shadow-lg transition-all"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[var(--primary)]/20 flex items-center justify-center">
              🐘
            </div>
            <span className="text-[var(--text-muted)]">
              What's on your mind?
            </span>
          </div>
        </motion.button>

        {/* Compose Modal */}
        <AnimatePresence>
          {showCompose && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-[var(--surface)] rounded-2xl p-4 border border-[var(--surface-hover)] mb-4 overflow-hidden"
            >
              <textarea
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                placeholder="Share what's on your mind... (500 characters max)"
                maxLength={500}
                className="w-full h-32 p-3 bg-[var(--background)] rounded-xl border border-[var(--surface-hover)] text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--primary)] resize-none"
              />
              
              {/* Post Type Selector */}
              <div className="flex gap-2 mt-3 overflow-x-auto pb-2">
                {POST_TYPES.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setPostType(type.id)}
                    className={`px-3 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all flex items-center gap-1 ${
                      postType === type.id
                        ? "bg-[var(--primary)] text-white"
                        : "bg-[var(--background)] text-[var(--text-secondary)]"
                    }`}
                  >
                    {type.emoji} {type.label}
                  </button>
                ))}
              </div>

              {/* Content Warning Toggle */}
              <label className="flex items-center gap-2 mt-3 text-sm text-[var(--text-secondary)]">
                <input
                  type="checkbox"
                  checked={showWarning}
                  onChange={(e) => setShowWarning(e.target.checked)}
                  className="w-4 h-4 rounded accent-[var(--primary)]"
                />
                ⚠️ Add content warning (for sensitive topics)
              </label>

              <div className="flex justify-between items-center mt-4">
                <span className="text-xs text-[var(--text-muted)]">
                  Posted as Blue Elephant 🐘
                </span>
                <button
                  onClick={handleCreatePost}
                  disabled={!newPost.trim()}
                  className="btn btn-primary px-6 disabled:opacity-50"
                >
                  Post Anonymously
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Posts Feed */}
        <div className="space-y-4">
          {filteredPosts.map((post) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[var(--surface)] rounded-2xl p-4 border border-[var(--surface-hover)]"
            >
              {/* Content Warning Overlay */}
              {post.contentWarning && (
                <div className="bg-[var(--warning)]/10 rounded-xl p-4 mb-3 text-center">
                  <p className="text-sm text-[var(--text-secondary)]">
                    ⚠️ <strong>Content Warning:</strong> {post.contentWarning}
                  </p>
                </div>
              )}

              {/* Author */}
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-xl"
                  style={{ backgroundColor: `${post.avatarColor}20` }}
                >
                  {post.avatarEmoji}
                </div>
                <div>
                  <p className="font-medium text-[var(--text-primary)]">
                    {post.pseudonym}
                  </p>
                  <p className="text-xs text-[var(--text-muted)]">
                    {post.createdAt}
                  </p>
                </div>
                <div className="ml-auto">
                  {POST_TYPES.find((t) => t.id === post.type) && (
                    <span className="px-2 py-1 rounded-full text-xs bg-[var(--background)] text-[var(--text-secondary)]">
                      {POST_TYPES.find((t) => t.id === post.type)?.emoji}
                    </span>
                  )}
                </div>
              </div>

              {/* Content */}
              <p className="text-[var(--text-primary)] mb-4 whitespace-pre-wrap">
                {post.content.length > 300 && expandedPost !== post.id
                  ? post.content.slice(0, 300) + "..."
                  : post.content}
              </p>
              
              {post.content.length > 300 && (
                <button
                  onClick={() => setExpandedPost(expandedPost === post.id ? null : post.id)}
                  className="text-sm text-[var(--primary)] mb-4 flex items-center gap-1"
                >
                  {expandedPost === post.id ? (
                    <>Show less <HiChevronUp className="w-4 h-4" /></>
                  ) : (
                    <>Read more <HiChevronDown className="w-4 h-4" /></>
                  )}
                </button>
              )}

              {/* Reactions */}
              <div className="flex items-center justify-between pt-3 border-t border-[var(--surface-hover)]">
                <div className="flex items-center gap-2">
                  {REACTION_TYPES.map((reaction) => (
                    <button
                      key={reaction.id}
                      onClick={() => handleReact(post.id, reaction.id)}
                      className="flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-[var(--background)] transition-colors"
                      title={reaction.label}
                    >
                      <span>{reaction.emoji}</span>
                      <span className="text-xs text-[var(--text-muted)]">
                        {(post.reactions as Record<string, number>)[reaction.id]}
                      </span>
                    </button>
                  ))}
                </div>
                <button className="text-sm text-[var(--text-muted)] hover:text-[var(--primary)]">
                  💬 {post.commentCount} comments
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-4xl mb-4">🌊</p>
            <p className="text-[var(--text-muted)]">
              No posts in this category yet. Be the first to share!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
