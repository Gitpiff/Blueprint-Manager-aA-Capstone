const express = require('express');
const bcrypt = require('bcryptjs');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { Project, ProjectImage } = require('../../db/models');

const router = express.Router();

const validateProject = [
    check('name')
        .exists({ checkFalsy: true })
        .isLength({ min: 4, max: 50 })  // Added max length validation
        .withMessage('Project Name must be between 4 and 50 characters'),
    check('clientName')
        .exists({ checkFalsy: true })
        .withMessage('Client Name is required'),  // Updated error message
    check('description')
        .exists({ checkFalsy: true })
        .isLength({ min: 30, max: 2000 })
        .withMessage('Project Description must have between 30 and 2000 characters'),
    check('budget')
        .exists({ checkFalsy: true })
        .isInt({ min: 500 })
        .withMessage('Budget must be an integer greater than 500'),
    check('startDate')
        .exists({ checkFalsy: true })
        .withMessage('Start Date is required'),
    check('completionDate')
        .exists({ checkFalsy: true })
        .withMessage('Completion Date is required'),
    handleValidationErrors
];

// Get All Projects of Current PM
router.get('/', async (req, res, next) => {
    // const { user } = req;

    // if (!user) {
    //     return res.status(401).json({
    //         message: 'Authentication Required'
    //     });
    // }

    const projects = await Project.findAll({
        include: [
            {
                model: ProjectImage,
                as: 'projectImages',
                attributes: ['url']
            },
        ],
        where: {
            projectManagerId: 1
        }
    });

    if (!projects || projects.length === 0) {  // Added check for no projects found
        return res.status(404).json({
            message: 'Projects could not be found'
        });
    }

    res.status(200).json(projects);
});

/// Post New Project
router.post('/new', validateProject, async (req, res, next) => {
    const { user } = req;
    console.log(`User from BE API: ${user.id}`);  // Log only necessary information
    
    try {
        const { name, clientName, description, budget, startDate, completionDate, coverImage, projectImages } = req.body;

        const newProject = await Project.create({
            projectManagerId: user.id,  // Use projectManagerId instead of userId
            name,
            clientName,
            description,
            budget,
            startDate,
            completionDate,
            coverImage,
        });

        const userImages = projectImages.map(imageUrl => {
            return ProjectImage.create({
                projectId: newProject.id,
                url: imageUrl
            })
        })

        await Promise.all(userImages);

        const createdProject = await Project.findByPk(newProject.id, {
            include: [
                {
                    model: ProjectImage,
                    as: 'projectImages'
                }
            ]
        })

        console.log(`Project created with ID: ${newProject.id}`);  // Log only the project ID or other non-sensitive info

        res.status(201).json(createdProject);
    } catch (error) {
        console.error("Error creating project:", error);  // Log the original error
        error.message = "Bad Request";
        error.status = 400;
        next(error);
    }
});



// Get a Project By Id
router.get('/:projectId', async (req, res, next) => {
    const { projectId } = req.params;

    try {
        const project = await Project.findByPk(projectId, {
            include: [{
                model: ProjectImage,
                as: 'projectImages',
                attributes: ['id', 'url'], // Include only necessary fields
            }]
        });

        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }

        return res.json(project);
    } catch (err) {
        next(err);
    }
});


// Delete Project
router.delete('/:projectId', requireAuth, async (req, res, next) => {
    const { user } = req;
    try {
        const project = await Project.findByPk(req.params.projectId);

        if (project) {
            if (project.projectManagerId !== user.id) {
                return res.status(403).json({ message: "Unauthorized to delete this project" });
            }

            await project.destroy();
            res.status(200).json({ message: "Project Successfully Deleted" });
        } else {
            res.status(404).json({ message: "Project not found" });
        }
    } catch (error) {
        next(error);
    }
});


// Update Project 
router.put('/:projectId', validateProject, requireAuth, async (req, res, next) => {
    const { user } = req;
    try {
        const { name, clientName, description, budget, commencementDate, completionDate } = req.body;
        const project = await Project.findByPk(req.params.projectId);

        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }

        if (project.projectManagerId !== user.id) {
            return res.status(403).json({ message: "Unauthorized to update this project" });
        }

        project.name = name;
        project.clientName = clientName;
        project.description = description;
        project.budget = budget;
        project.commencementDate = commencementDate;
        project.completionDate = completionDate;

        await project.save();

        res.status(200).json(project);
    } catch (error) {
        next({
            message: "Bad Request",
            status: 400,
            stack: error.stack
        });
    }
});

// Delete Project
router.delete('/:projectId', requireAuth, async (req, res, next) => {
    const { user } = req;
    try {
        const project = await Project.findByPk(req.params.projectId);

        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }

        if (project.projectManagerId !== user.id) {
            return res.status(403).json({ message: "Unauthorized to delete this project" });
        }

        await project.destroy();
        res.status(200).json({ message: "Project Successfully Deleted" });
    } catch (error) {
        next(error);
    }
});

module.exports = router;
