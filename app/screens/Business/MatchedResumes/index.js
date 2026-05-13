import React, {useRef, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Popover from 'react-native-popover-view';
import Svg, {Circle} from 'react-native-svg';
import {CHeader} from '@components/CHeader';
import CSlider from '@components/CSlider';
import CAutoComplete from '@components/CAutoComplete';
import {CButton} from '@components/CButton';
import {useThemeContext} from '@contexts/themeContext';
import Icon, {Icons} from '@config/Icons';
import {sortArray} from '@config/staticData';
import {CustomIcon} from '@config/LoadIcons';
import {resumeGenerateApi, useMatchingResume} from '@apis/ApiRoutes/Business';
import GetStyles from './styles';

const IOS = Platform.OS === 'ios';

const ApplicantRow = ({item, index}) => {
  const {color} = useThemeContext();
  const styles = GetStyles();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const subtitleParts = [
    item?.headline,
    item?.total_experience !== undefined
      ? `${item.total_experience} years exp`
      : null,
    item?.location,
  ];

  const subtitleString = subtitleParts.filter(Boolean).join(' • ');
  const matchPercent =
    item?.skill_match_score?.percent || item?.match_percent || 0;
  const getScoreColor = percent => {
    if (percent >= 80) return color.green;
    if (percent >= 30) return color.primary; // covers 30 to 89
    return color.red; // below 30
  };
  const dynamicColor = getScoreColor(matchPercent);

  const size = 42; // Width and height of the SVG
  const strokeWidth = 4;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (matchPercent / 100) * circumference;

  const toggleExpand = () => setIsExpanded(!isExpanded);

  const openResume = async () => {
    // Prevent the user from spam-clicking while it's already downloading
    if (isDownloading) return;

    try {
      setIsDownloading(true);
      await resumeGenerateApi(item?.seeker_id);
    } catch (error) {
      console.error('Resume download failed:', error);
    } finally {
      setIsDownloading(false);
    }
  };
  const bgColor = [color.primary, color.hexBlue, color.orange, color.green];

  return (
    <View style={styles.card}>
      <TouchableOpacity
        style={styles.cardHeader}
        activeOpacity={0.7}
        onPress={toggleExpand}>
        <View
          style={[
            styles.avatar,
            {backgroundColor: bgColor[index % bgColor.length]},
          ]}>
          <Text style={styles.avatarText}>{item?.avatar}</Text>
        </View>

        <View style={styles.headerInfo}>
          <View style={styles.nameRow}>
            <Text style={styles.nameText} numberOfLines={2}>
              {item?.full_name}
            </Text>
            {item?.is_top_match && (
              <View style={styles.topMatchBadge}>
                <Text style={styles.topMatchText}>TOP MATCH</Text>
              </View>
            )}
          </View>
          <Text style={styles.subtitleText} numberOfLines={2}>
            {subtitleString}
          </Text>
        </View>

        <View style={styles.headerRight}>
          <View style={styles.progressContainer}>
            <Svg
              width={size}
              height={size}
              style={{transform: [{rotate: '-90deg'}]}}>
              <Circle
                stroke={color.borderColor}
                fill="none"
                cx={size / 2}
                cy={size / 2}
                r={radius}
                strokeWidth={strokeWidth}
              />
              <Circle
                stroke={dynamicColor}
                fill="none"
                cx={size / 2}
                cy={size / 2}
                r={radius}
                strokeWidth={strokeWidth}
                strokeDasharray={`${circumference} ${circumference}`}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
              />
            </Svg>
            <View style={styles.progressTextContainer}>
              <Text style={styles.scoreCircleText}>{matchPercent}%</Text>
            </View>
          </View>
          <Icon
            type={Icons.Feather}
            name={isExpanded ? 'chevron-up' : 'chevron-down'}
            size={20}
            color={color.gray200}
          />
        </View>
      </TouchableOpacity>

      {/* Expanded Details Section */}
      {isExpanded && (
        <View style={styles.expandedContent}>
          <View style={styles.darkCard}>
            <View style={styles.darkCardHeader}>
              <Text style={styles.darkCardTitle}>SKILL MATCH SCORE</Text>
              <Text style={styles.darkCardScore}>{matchPercent}%</Text>
            </View>

            <View style={styles.progressBarBg}>
              <View
                style={[styles.progressBarFill, {width: `${matchPercent}%`}]}
              />
            </View>

            <View style={styles.matchStatsRow}>
              <View style={styles.statItem}>
                <View style={[styles.dot, {backgroundColor: color.green}]} />
                <Text style={styles.statText}>
                  Matched: {item?.skill_match_score?.matched || 0}
                </Text>
              </View>
              <View style={styles.statItem}>
                <View style={[styles.dot, {backgroundColor: color.red}]} />
                <Text style={styles.statText}>
                  Missing: {item?.skill_match_score?.missing || 0}
                </Text>
              </View>
            </View>
            <CButton
              loading={isDownloading}
              disabled={isDownloading}
              label="Download Resume"
              onPress={openResume}
              outLineBtn
            />
          </View>

          <Text style={styles.sectionHeader}>Contact Information</Text>
          <View style={styles.contactCard}>
            {item?.email && (
              <View style={styles.contactRow}>
                <Icon
                  type={Icons.MaterialIcons}
                  name="email"
                  size={20}
                  color={color.gray200}
                />
                <View style={styles.contactInfo}>
                  <Text style={styles.contactLabel}>Email</Text>
                  <Text style={styles.contactValue}>{item?.email}</Text>
                </View>
              </View>
            )}
            {item?.mobile_number && (
              <View style={styles.contactRow}>
                <Icon
                  type={Icons.Feather}
                  name="phone"
                  size={20}
                  color={color.gray200}
                />
                <View style={styles.contactInfo}>
                  <Text style={styles.contactLabel}>Phone</Text>
                  <Text style={styles.contactValue}>{item?.mobile_number}</Text>
                </View>
              </View>
            )}
            {item?.location && (
              <View style={styles.contactRow}>
                <Icon
                  type={Icons.Feather}
                  name="map-pin"
                  size={20}
                  color={color.gray200}
                />
                <View style={styles.contactInfo}>
                  <Text style={styles.contactLabel}>Location</Text>
                  <Text style={styles.contactValue}>{item?.location}</Text>
                </View>
              </View>
            )}
          </View>
          <Text style={styles.sectionHeader}>Skill Details</Text>
          {item?.skills_breakdown?.matched?.length > 0 && (
            <View style={styles.skillCategory}>
              <View style={styles.skillCategoryHeader}>
                <Icon
                  type={Icons.Feather}
                  name="check"
                  size={16}
                  color={color.green}
                />
                <Text style={styles.skillCategoryTitle(color.green)}>
                  Matched
                </Text>
              </View>
              <View style={styles.pillContainer}>
                {item.skills_breakdown.matched.map((skill, index) => (
                  <View
                    key={`matched-${index}`}
                    style={styles.pill(color.green)}>
                    <Text style={styles.pillText(color.green)}>{skill}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {item?.skills_breakdown?.missing?.length > 0 && (
            <View style={styles.skillCategory}>
              <View style={styles.skillCategoryHeader}>
                <Icon
                  type={Icons.Feather}
                  name="x"
                  size={16}
                  color={color.red}
                />
                <Text style={styles.skillCategoryTitle(color.red)}>
                  Missing
                </Text>
              </View>
              <View style={styles.pillContainer}>
                {item.skills_breakdown.missing.map((skill, index) => (
                  <View key={`missing-${index}`} style={styles.pill(color.red)}>
                    <Text style={[styles.pillText(color.red)]}>{skill}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {item?.skills_breakdown?.additional?.length > 0 && (
            <View style={styles.skillCategory}>
              <View style={styles.skillCategoryHeader}>
                <Icon
                  type={Icons.Feather}
                  name="plus"
                  size={16}
                  color={color.blue}
                />
                <Text style={styles.skillCategoryTitle(color.blue)}>
                  Additional / Other Skills
                </Text>
              </View>
              <View style={styles.pillContainer}>
                {item.skills_breakdown.additional.map((skill, index) => (
                  <View
                    key={`additional-${index}`}
                    style={styles.pill(color.blue)}>
                    <Text style={[styles.pillText(color.blue)]}>{skill}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {item?.experience?.length > 0 && (
            <View>
              <Text style={styles.sectionHeader}>WORK EXPERIENCE</Text>
              {item.experience.map((exp, index) => {
                const isLast = index === item.experience.length - 1;

                return (
                  <View key={exp.exp_id || index} style={styles.experienceItem}>
                    <View style={styles.timelineLeftColumn}>
                      <View style={styles.timelineBullet} />
                      {!isLast && <View style={styles.timelineLine} />}
                    </View>

                    <View style={styles.experienceContent}>
                      <Text style={styles.experienceRole}>{exp.role}</Text>
                      <Text style={styles.experienceCompany}>
                        {exp.company}
                      </Text>
                      <Text style={styles.experienceMeta}>
                        {exp.start_month_year} -{' '}
                        {exp.is_current ? 'Present' : exp.end_month_year} •{' '}
                        {exp.city}
                      </Text>
                    </View>
                  </View>
                );
              })}
            </View>
          )}

          {item?.education?.length > 0 && (
            <View>
              <Text style={styles.sectionHeader}>EDUCATION</Text>
              {item.education.map((edu, index) => (
                <View
                  key={edu.education_id || index}
                  style={styles.educationCard}>
                  <Text style={styles.educationDegree}>{edu.degree}</Text>
                  <Text style={styles.educationCollege}>{edu.college}</Text>
                  <Text style={styles.educationMeta}>{edu.city}</Text>
                </View>
              ))}
            </View>
          )}
        </View>
      )}
    </View>
  );
};

const MatchedResumes = () => {
  const styles = GetStyles();
  const {color} = useThemeContext();
  const [filter, setFilter] = useState(sortArray[0]);
  const filterBtnRef = useRef(null);
  const [popoverAnchor, setPopoverAnchor] = useState(null);
  const [search, setSearch] = useState('');
  const [matchPercentage, setMatchPercentage] = useState(40);
  const [skillList, setSkillList] = useState([]);

  const closePopover = () => setPopoverAnchor(null);

  const handleFilterSelect = selectedOption => {
    setFilter(selectedOption);
    closePopover();
  };
  const searchCriteria = {
    skills: skillList,
    min_match_percent: matchPercentage,
  };

  const {
    data,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
    refetch,
    isRefetching,
  } = useMatchingResume(searchCriteria, 'match', filter?.value);

  const candidates = data?.pages.flatMap(page => page.data) || [];

  const loadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const handleAddSkill = item => {
    const newSkill = item?.name;

    if (newSkill && !skillList.includes(newSkill)) {
      const updatedList = [...skillList, newSkill];
      setSkillList(updatedList);
    }
    setSearch('');
  };

  const handleRemoveSkill = item => {
    const updatedList = skillList.filter(skill => skill !== item);
    setSkillList(updatedList);
  };

  return (
    <View style={styles.root}>
      <CHeader title="Matched Resumes" back />
      <KeyboardAvoidingView behavior={IOS ? 'padding' : null} style={{flex: 1}}>
        <View style={styles.screenHeader}>
          <CAutoComplete
            placeholder="Search Skill (eg. React)"
            value={search}
            onSelect={item => {
              handleAddSkill(item);
            }}
            type="skill"
            mainContainerStyle={{marginBottom: 0, flex: 1}}
            inputViewStyle={{height: 35}}
            inputStyle={{
              flex: 1,
              minWidth: '100%',
              paddingVertical: 0,
            }}
          />
          <TouchableOpacity
            ref={filterBtnRef}
            activeOpacity={0.7}
            style={styles.filterBtn}
            onPress={() => setPopoverAnchor(filterBtnRef)}>
            <Text style={styles.filterText}>{filter?.label}</Text>
            <Icon
              type={Icons.Feather}
              name="chevron-down"
              size={16}
              color={color.black}
            />
          </TouchableOpacity>
        </View>
        <View style={{paddingHorizontal: 16}}>
          <View style={styles.chipContainer}>
            {skillList.map((skill, index) => (
              <View key={index} style={styles.chip}>
                <Text style={styles.chipText}>{skill}</Text>
                <TouchableOpacity onPress={() => handleRemoveSkill(skill)}>
                  <CustomIcon name="close" size={10} color={color.black} />
                </TouchableOpacity>
              </View>
            ))}
          </View>
          <CSlider
            title="Min. Match"
            initialValue={matchPercentage}
            onValueChange={newValue => {
              setMatchPercentage(newValue);
            }}
          />
        </View>

        {isLoading ? (
          <View style={styles.emptyComponent}>
            <ActivityIndicator size="large" color={color.primary} />
          </View>
        ) : (
          <View style={{flex: 1}}>
            <FlatList
              data={candidates}
              renderItem={({item, index}) => (
                <ApplicantRow item={item} index={index} />
              )}
              keyExtractor={item => item.transaction_id}
              contentContainerStyle={styles.listContent}
              showsVerticalScrollIndicator={false}
              onEndReached={loadMore}
              onEndReachedThreshold={0.5}
              refreshing={isRefetching}
              onRefresh={refetch}
              ListEmptyComponent={
                <View style={styles.emptyComponent}>
                  <Text style={styles.emptyText}>No Candidate found</Text>/
                </View>
              }
              ListFooterComponent={
                isFetchingNextPage ? (
                  <ActivityIndicator color={color.primary} />
                ) : null
              }
            />
          </View>
        )}
      </KeyboardAvoidingView>
      <Popover
        isVisible={!!popoverAnchor}
        from={popoverAnchor}
        onRequestClose={closePopover}
        popoverStyle={styles.popoverStyle}
        arrowSize={{width: 0, height: 0}}>
        <View style={styles.popoverInnerContainer}>
          {sortArray.map(option => {
            const isActive = filter === option;

            return (
              <TouchableOpacity
                key={option}
                activeOpacity={0.7}
                style={styles.popoverRow}
                onPress={() => handleFilterSelect(option)}>
                <Text
                  style={[
                    styles.popoverText,
                    isActive && styles.popoverTextActive,
                  ]}>
                  {option?.label}
                </Text>
                <View style={styles.popoverIconContainer}>
                  {isActive && (
                    <Icon
                      type={Icons.Feather}
                      name="check"
                      size={20}
                      color={color.blue}
                    />
                  )}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </Popover>
    </View>
  );
};

export default MatchedResumes;
