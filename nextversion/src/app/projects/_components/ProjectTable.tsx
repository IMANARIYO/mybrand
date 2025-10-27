"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Edit, Trash2, Eye, Plus, ExternalLink, Github } from "lucide-react"

import { ProjectForm } from "./ProjectForm"
import { deleteProject } from "../_server-actions/deleteProject"
import type { Project } from "@/db/schema"

interface ProjectTableProps {
  projects: Project[]
  onProjectUpdated?: () => void
}

export function ProjectTable({ projects, onProjectUpdated }: ProjectTableProps) {
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [isDeleting, setIsDeleting] = useState<string | null>(null)

  const handleDelete = async (id: string) => {
    setIsDeleting(id)
    try {
      const result = await deleteProject(id)
      if (result.success) {
        onProjectUpdated?.()
      }
    } catch (error) {
      console.error('Error deleting project:', error)
    } finally {
      setIsDeleting(null)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800'
      case 'in-progress': return 'bg-yellow-100 text-yellow-800'
      case 'planned': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'fullstack': return 'bg-primary/10 text-primary'
      case 'web': return 'bg-secondary/10 text-secondary'
      case 'mobile': return 'bg-accent/10 text-accent'
      case 'api': return 'bg-muted text-muted-foreground'
      default: return 'bg-muted text-muted-foreground'
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Project Management</CardTitle>
            <CardDescription>Manage your portfolio projects</CardDescription>
          </div>
          <Dialog open={showCreateForm} onOpenChange={setShowCreateForm}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Project
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Create New Project</DialogTitle>
              </DialogHeader>
              <ProjectForm
                onSuccess={() => {
                  setShowCreateForm(false)
                  onProjectUpdated?.()
                }}
                onCancel={() => setShowCreateForm(false)}
              />
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Views</TableHead>
                <TableHead>Featured</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell className="font-medium">
                    <div>
                      <div className="font-semibold">{project.title}</div>
                      <div className="text-sm text-muted-foreground truncate max-w-xs">
                        {project.description}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getCategoryColor(project.category)}>
                      {project.category}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(project.status)}>
                      {project.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{project.viewCount}</TableCell>
                  <TableCell>
                    {project.isFeatured && (
                      <Badge variant="outline">Featured</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    {new Date(project.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      {project.liveDemo && (
                        <Button asChild variant="ghost" size="sm">
                          <a href={project.liveDemo} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        </Button>
                      )}
                      {project.sourceCode && (
                        <Button asChild variant="ghost" size="sm">
                          <a href={project.sourceCode} target="_blank" rel="noopener noreferrer">
                            <Github className="h-4 w-4" />
                          </a>
                        </Button>
                      )}
                      <Button asChild variant="ghost" size="sm">
                        <a href={`/projects/${project.slug}`} target="_blank">
                          <Eye className="h-4 w-4" />
                        </a>
                      </Button>

                      <Dialog open={editingProject?.id === project.id} onOpenChange={(open) => !open && setEditingProject(null)}>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="sm" onClick={() => setEditingProject(project)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>Edit Project</DialogTitle>
                          </DialogHeader>
                          {editingProject && (
                            <ProjectForm
                              project={{
                                ...editingProject,
                                architecture: typeof editingProject.architecture === 'string'
                                  ? { layers: [], notes: editingProject.architecture }
                                  : editingProject.architecture,
                                images: Array.isArray(editingProject.images)
                                  ? { main: editingProject.images[0] || '', others: editingProject.images.slice(1).map(url => ({ url })) }
                                  : editingProject.images,
                                liveDemo: editingProject.liveDemo ?? undefined,
                                sourceCode: editingProject.sourceCode ?? undefined,
                                endDate: editingProject.endDate ?? undefined,
                                whyItMatters: editingProject.whyItMatters ?? undefined
                              }}
                              onSuccess={() => {
                                setEditingProject(null)
                                onProjectUpdated?.()
                              }}
                              onCancel={() => setEditingProject(null)}
                            />
                          )}
                        </DialogContent>
                      </Dialog>

                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Project</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete &ldquo;{project.title}&rdquo;? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(project.id)}
                              disabled={isDeleting === project.id}
                              className="bg-red-600 hover:bg-red-700"
                            >
                              {isDeleting === project.id ? 'Deleting...' : 'Delete'}
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {projects.length === 0 && (
          <div className="text-center py-12">
            <div className="text-muted-foreground">
              <div className="text-lg mb-2">No projects found</div>
              <div className="text-sm">Create your first project to get started</div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}