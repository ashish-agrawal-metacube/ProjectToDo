module Filterable
  extend ActiveSupport::Concern

  module ClassMethods
    def filter(filtering_params)
      results = self.where(nil)
      filtering_params.each do |key, value|
        results = results.public_send("by_#{key}", value) if value.present?
      end if filtering_params.present?
      results
    end
  end

end
