import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

const postsDirectory = path.join(process.cwd(), 'src/content/blog')

export interface BlogPost {
  slug: string
  title: string
  date: string
  author: string
  excerpt: string
  category: string
  featured: boolean
  content: string
}

export interface BlogPostMeta {
  slug: string
  title: string
  date: string
  author: string
  excerpt: string
  category: string
  featured: boolean
}

export async function getAllPosts(): Promise<BlogPostMeta[]> {
  try {
    // Check if directory exists
    if (!fs.existsSync(postsDirectory)) {
      return []
    }

    // Get file names under /posts
    const fileNames = fs.readdirSync(postsDirectory)
    const markdownFiles = fileNames.filter((fileName) => fileName.endsWith('.md'))
    
    // Return empty array if no markdown files
    if (markdownFiles.length === 0) {
      return []
    }

    const allPostsData = await Promise.all(
      markdownFiles.map(async (fileName) => {
        // Remove ".md" from file name to get slug
        const slug = fileName.replace(/\.md$/, '')

        // Read markdown file as string
        const fullPath = path.join(postsDirectory, fileName)
        const fileContents = fs.readFileSync(fullPath, 'utf8')

        // Use gray-matter to parse the post metadata section
        const matterResult = matter(fileContents)

        return {
          slug,
          title: matterResult.data.title,
          date: matterResult.data.date,
          author: matterResult.data.author,
          excerpt: matterResult.data.excerpt,
          category: matterResult.data.category,
          featured: matterResult.data.featured || false,
        }
      })
    )

    // Sort posts by date
    return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1))
  } catch (error) {
    console.error('Error loading posts:', error)
    return []
  }
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents)

    // Use remark to convert markdown into HTML string
    const processedContent = await remark()
      .use(html)
      .process(matterResult.content)
    const contentHtml = processedContent.toString()

    return {
      slug,
      title: matterResult.data.title,
      date: matterResult.data.date,
      author: matterResult.data.author,
      excerpt: matterResult.data.excerpt,
      category: matterResult.data.category,
      featured: matterResult.data.featured || false,
      content: contentHtml,
    }
  } catch (error) {
    console.error(`Error loading post ${slug}:`, error)
    return null
  }
}

export function getAllPostSlugs(): string[] {
  try {
    // Check if directory exists
    if (!fs.existsSync(postsDirectory)) {
      return []
    }

    const fileNames = fs.readdirSync(postsDirectory)
    return fileNames
      .filter((fileName) => fileName.endsWith('.md'))
      .map((fileName) => fileName.replace(/\.md$/, ''))
  } catch (error) {
    console.error('Error loading post slugs:', error)
    return []
  }
} 