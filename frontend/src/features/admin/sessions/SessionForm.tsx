import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSpeakers, useCreateSpeaker } from '../../../hooks/useSpeakers';
import { useTags } from '../../../hooks/useTags';
import { Input } from '../../../components/ui/Input';
import { Button } from '../../../components/ui/Button';
import { Card } from '../../../components/ui/Card';
import type { Session, SessionCreate } from '../../../types/session.types';

interface SessionFormProps {
  session?: Session;
  onSubmit: (data: SessionCreate, isDraft: boolean) => Promise<void>;
  isLoading?: boolean;
}

export const SessionForm: React.FC<SessionFormProps> = ({
  session,
  onSubmit,
  isLoading = false,
}) => {
  const navigate = useNavigate();

  // Form state
  const [title, setTitle] = useState(session?.title || '');
  const [summary, setSummary] = useState(session?.summary || '');
  const [abstract, setAbstract] = useState(session?.abstract || '');
  const [objectives, setObjectives] = useState<string[]>(session?.objectives || ['']);
  const [date, setDate] = useState(session?.date || '');
  const [time, setTime] = useState(session?.time || '');
  const [duration, setDuration] = useState(session?.duration_minutes?.toString() || '60');
  const [platform, setPlatform] = useState(session?.platform || 'Zoom');
  const [meetingLink, setMeetingLink] = useState(session?.meeting_link || '');
  const [meetingId, setMeetingId] = useState(session?.meeting_id || '');
  const [meetingPassword, setMeetingPassword] = useState(session?.meeting_password || '');
  const [speakerId, setSpeakerId] = useState(session?.speaker?.id || '');
  const [organTagId, setOrganTagId] = useState(session?.organ_tag?.id || '');
  const [typeTagId, setTypeTagId] = useState(session?.type_tag?.id || '');
  const [levelTagId, setLevelTagId] = useState(session?.level_tag?.id || '');

  const [showAddSpeaker, setShowAddSpeaker] = useState(false);
  const [newSpeakerName, setNewSpeakerName] = useState('');
  const [newSpeakerDesignation, setNewSpeakerDesignation] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Fetch data
  const { data: speakers } = useSpeakers();
  const { data: tags } = useTags();
  const createSpeaker = useCreateSpeaker();

  // Filter tags by category
  const organTags = tags?.filter((tag) => tag.category === 'organ' && tag.is_active) || [];
  const typeTags = tags?.filter((tag) => tag.category === 'type' && tag.is_active) || [];
  const levelTags = tags?.filter((tag) => tag.category === 'level' && tag.is_active) || [];

  const addObjective = () => {
    setObjectives([...objectives, '']);
  };

  const removeObjective = (index: number) => {
    setObjectives(objectives.filter((_, i) => i !== index));
  };

  const updateObjective = (index: number, value: string) => {
    const updated = [...objectives];
    updated[index] = value;
    setObjectives(updated);
  };

  const handleAddSpeaker = async () => {
    if (!newSpeakerName.trim() || !newSpeakerDesignation.trim()) {
      return;
    }

    try {
      const newSpeaker = await createSpeaker.mutateAsync({
        name: newSpeakerName,
        title: newSpeakerDesignation,
        affiliation: 'AIIMS', // Default affiliation
      });
      setSpeakerId(newSpeaker.id);
      setShowAddSpeaker(false);
      setNewSpeakerName('');
      setNewSpeakerDesignation('');
    } catch (error) {
      console.error('Error creating speaker:', error);
    }
  };

  const validate = (isDraft: boolean): boolean => {
    const newErrors: Record<string, string> = {};

    if (!title.trim()) newErrors.title = 'Title is required';
    if (!summary.trim()) newErrors.summary = 'Summary is required';
    if (!abstract.trim()) newErrors.abstract = 'Abstract is required';
    if (objectives.filter((o) => o.trim()).length === 0) {
      newErrors.objectives = 'At least one learning objective is required';
    }
    if (!date) newErrors.date = 'Date is required';
    if (!time) newErrors.time = 'Time is required';
    if (!duration || parseInt(duration) <= 0) {
      newErrors.duration = 'Valid duration is required';
    }
    if (!speakerId) newErrors.speaker = 'Speaker is required';
    if (!organTagId) newErrors.organ = 'Organ system is required';
    if (!typeTagId) newErrors.type = 'Session type is required';
    if (!levelTagId) newErrors.level = 'Level is required';

    // For publishing, meeting link is required
    if (!isDraft && !meetingLink.trim()) {
      newErrors.meetingLink = 'Meeting link is required for publishing';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (isDraft: boolean) => {
    if (!validate(isDraft)) {
      return;
    }

    const data: SessionCreate = {
      title: title.trim(),
      summary: summary.trim(),
      abstract: abstract.trim(),
      objectives: objectives.filter((o) => o.trim()),
      date,
      time,
      duration_minutes: parseInt(duration),
      status: isDraft ? 'draft' : 'published',
      platform,
      meeting_link: meetingLink.trim() || undefined,
      meeting_id: meetingId.trim() || undefined,
      meeting_password: meetingPassword.trim() || undefined,
      speaker_id: speakerId,
      organ_tag_id: organTagId,
      type_tag_id: typeTagId,
      level_tag_id: levelTagId,
    };

    await onSubmit(data, isDraft);
  };

  return (
    <div className="space-y-6">
      {/* Basic Info Section */}
      <Card>
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Basic Information</h2>
          <div className="space-y-4">
            <Input
              label="Title *"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              error={errors.title}
              placeholder="Enter session title"
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Summary *
              </label>
              <textarea
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                  errors.summary ? 'border-red-500' : 'border-gray-300'
                }`}
                rows={3}
                placeholder="Brief summary of the session"
              />
              {errors.summary && (
                <p className="mt-1 text-sm text-red-600">{errors.summary}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Abstract *
              </label>
              <textarea
                value={abstract}
                onChange={(e) => setAbstract(e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent ${
                  errors.abstract ? 'border-red-500' : 'border-gray-300'
                }`}
                rows={5}
                placeholder="Detailed abstract of the session"
              />
              {errors.abstract && (
                <p className="mt-1 text-sm text-red-600">{errors.abstract}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Learning Objectives *
              </label>
              {objectives.map((objective, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={objective}
                    onChange={(e) => updateObjective(index, e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder={`Objective ${index + 1}`}
                  />
                  {objectives.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeObjective(index)}
                      className="text-red-600"
                    >
                      Remove
                    </Button>
                  )}
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addObjective}
              >
                Add Objective
              </Button>
              {errors.objectives && (
                <p className="mt-1 text-sm text-red-600">{errors.objectives}</p>
              )}
            </div>
          </div>
        </div>
      </Card>

      {/* Schedule Section */}
      <Card>
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Schedule</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              label="Date *"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              error={errors.date}
            />
            <Input
              label="Time *"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              error={errors.time}
            />
            <Input
              label="Duration (minutes) *"
              type="number"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              error={errors.duration}
              min="1"
            />
          </div>
        </div>
      </Card>

      {/* Meeting Section */}
      <Card>
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Meeting Details</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Platform *
              </label>
              <select
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="Zoom">Zoom</option>
                <option value="Google Meet">Google Meet</option>
                <option value="Microsoft Teams">Microsoft Teams</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <Input
              label="Meeting Link"
              type="url"
              value={meetingLink}
              onChange={(e) => setMeetingLink(e.target.value)}
              error={errors.meetingLink}
              placeholder="https://zoom.us/j/..."
              helperText="Required for publishing session"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Meeting ID (Optional)"
                value={meetingId}
                onChange={(e) => setMeetingId(e.target.value)}
                placeholder="123 456 7890"
              />
              <Input
                label="Password (Optional)"
                value={meetingPassword}
                onChange={(e) => setMeetingPassword(e.target.value)}
                placeholder="Meeting password"
              />
            </div>
          </div>
        </div>
      </Card>

      {/* Speaker Section */}
      <Card>
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Speaker</h2>
          <div className="space-y-4">
            {!showAddSpeaker ? (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Select Speaker *
                  </label>
                  <select
                    value={speakerId}
                    onChange={(e) => setSpeakerId(e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                      errors.speaker ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select a speaker</option>
                    {speakers?.map((speaker) => (
                      <option key={speaker.id} value={speaker.id}>
                        {speaker.name} - {speaker.title}
                      </option>
                    ))}
                  </select>
                  {errors.speaker && (
                    <p className="mt-1 text-sm text-red-600">{errors.speaker}</p>
                  )}
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setShowAddSpeaker(true)}
                >
                  Add New Speaker
                </Button>
              </>
            ) : (
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-medium text-gray-900 mb-3">Add New Speaker</h3>
                <div className="space-y-3">
                  <Input
                    label="Name"
                    value={newSpeakerName}
                    onChange={(e) => setNewSpeakerName(e.target.value)}
                    placeholder="Dr. Speaker Name"
                  />
                  <Input
                    label="Designation"
                    value={newSpeakerDesignation}
                    onChange={(e) => setNewSpeakerDesignation(e.target.value)}
                    placeholder="Professor, Department of Pathology"
                  />
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant="primary"
                      size="sm"
                      onClick={handleAddSpeaker}
                      disabled={createSpeaker.isPending}
                    >
                      {createSpeaker.isPending ? 'Adding...' : 'Add Speaker'}
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowAddSpeaker(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </Card>

      {/* Classification Section */}
      <Card>
        <div className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Classification</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Organ System *
              </label>
              <select
                value={organTagId}
                onChange={(e) => setOrganTagId(e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                  errors.organ ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Select organ system</option>
                {organTags.map((tag) => (
                  <option key={tag.id} value={tag.id}>
                    {tag.label}
                  </option>
                ))}
              </select>
              {errors.organ && (
                <p className="mt-1 text-sm text-red-600">{errors.organ}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Session Type *
              </label>
              <select
                value={typeTagId}
                onChange={(e) => setTypeTagId(e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                  errors.type ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Select session type</option>
                {typeTags.map((tag) => (
                  <option key={tag.id} value={tag.id}>
                    {tag.label}
                  </option>
                ))}
              </select>
              {errors.type && (
                <p className="mt-1 text-sm text-red-600">{errors.type}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Level *
              </label>
              <select
                value={levelTagId}
                onChange={(e) => setLevelTagId(e.target.value)}
                className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                  errors.level ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Select level</option>
                {levelTags.map((tag) => (
                  <option key={tag.id} value={tag.id}>
                    {tag.label}
                  </option>
                ))}
              </select>
              {errors.level && (
                <p className="mt-1 text-sm text-red-600">{errors.level}</p>
              )}
            </div>
          </div>
        </div>
      </Card>

      {/* Form Actions */}
      <div className="flex justify-end gap-4">
        <Button
          type="button"
          variant="ghost"
          onClick={() => navigate('/admin/sessions')}
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => handleSubmit(true)}
          disabled={isLoading}
        >
          Save as Draft
        </Button>
        <Button
          type="button"
          variant="primary"
          onClick={() => handleSubmit(false)}
          disabled={isLoading}
        >
          {isLoading ? 'Saving...' : 'Save & Publish'}
        </Button>
      </div>
    </div>
  );
};
